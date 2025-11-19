import {Box, Button, ButtonGroup, Grid, Stack, Typography, Link, Paper} from "@mui/material";
import {RadarChart, type RadarSeries} from "@mui/x-charts";
import {useCallback, useMemo} from "react";
import {useLocation, useNavigate, Link as RouterLink} from "react-router";
import type {ISkill} from "@assets/data/ISkill.ts";
import {data as skillDataMap} from "@assets/data/skillData.ts";
import dayjs from "dayjs";

// TODO: Segmentar em componentes menores, maybe hooks?...
export function MySkills() {
	const navigate = useNavigate();
	const location = useLocation();

	// Carrega e normaliza todos os skills a partir do mapa estatico
	const allSkills = useMemo<ISkill[]>(() => {
		const values = Object.values(skillDataMap) as (true | ISkill)[];
		return values
			.filter((v): v is ISkill => v !== true && typeof v === 'object')
			.map((s) => {
				const normalizedRelated = (s.related ?? []).map((r: any) =>
					typeof r === 'string' ? {name: r} : r
				);
				return {
					...s,
					onSelect: s.name,
					related: normalizedRelated,
				} as ISkill;
			});
	}, []);

	// Ordena e calcula o nível raiz conforme regras
	const rootData = useMemo<ISkill[]>(() => {
		const sortedAll = [...allSkills].sort((a, b) => a.name.toString().localeCompare(b.name.toString()));
		let filteredRoot = sortedAll.filter(s => s.isRoot === true);
		if (filteredRoot.length === 0) filteredRoot = sortedAll.filter(s => (s.related?.length ?? 0) === 0);
		if (filteredRoot.length === 0) filteredRoot = sortedAll;
		return filteredRoot;
	}, [allSkills]);


	// Helpers
	const getSelectedTag = () => (location.hash ?? '').replace(/^#/, '').trim();

	// Helper: label de exibição priorizando displayName quando existir
	const getDisplayLabel = (s: ISkill) => (s.displayName ?? s.name).toString();

	const resolveRelatedOfTag = useCallback((tag: string): ISkill[] => {
		// encontra a skill selecionada pelo onSelect (ou name) e resolve seus relateds em ISkill
		const selected = allSkills.find(s => s.name.toString() === tag || s.name.toString() === tag);
		if (!selected) return [];

		// Mapeia os relateds do selecionado para { nomeBase -> prefOverride? }
		const relatedPrefMap = new Map<string, number | undefined>();
		(selected.related ?? []).forEach((r: any) => {
			const rName = (typeof r === 'string' ? r : (r.onSelect ?? r.name))?.toString();
			if (!rName) return;
			const rPref = (typeof r === 'object' && typeof r.pref === 'number') ? r.pref : undefined;
			relatedPrefMap.set(rName, rPref);
		});

		// Retorna os ISkills q nome ou select estão nos relateds,
		// aplicando o override de pref quando especificado no relacionamento
		const result: ISkill[] = [];
		allSkills.forEach((s) => {
			const baseName = s.name.toString();
			const onSel = s.name.toString();
			// se o related foi declarado por name ou por onSelect aceitamos ambos
			const hasRel = relatedPrefMap.has(baseName) || relatedPrefMap.has(onSel);
			if (!hasRel) return;
			const override = relatedPrefMap.get(baseName) ?? relatedPrefMap.get(onSel);
			if (typeof override === 'number') {
				result.push({...s, pref: override});
			} else {
				result.push(s);
			}
		});
		return result;
	}, [allSkills]);

	// Localiza por tag (quem referencia a tag)
	const byTag = useCallback((tag: string) => {
		return allSkills.filter(s => (s.related ?? []).some((t: any) => {
			const tName = typeof t === 'string' ? t : (t.onSelect ?? t.name);
			return tName === tag;
		}));
	}, [allSkills]);

	// Conjunto atual (selecao via hash => inverso; senao nivel raiz)
	const selectedTag = getSelectedTag();
	const selectedSkill = useMemo<ISkill | undefined>(() => {
		if (!selectedTag) return undefined;
		return allSkills.find(s => s.name.toString() === selectedTag || s.name.toString() === selectedTag);
	}, [selectedTag, allSkills]);
	const current = useMemo<ISkill[]>(() => {
		if (!selectedTag) return rootData;
		const nextLevel = byTag(selectedTag);
		return nextLevel.length > 0 ? nextLevel : rootData;
	}, [selectedTag, rootData, byTag]);

	// Garante um mínimo de 3 itens no display repetindo os existentes (para não “quebrar” o layout) — usado no modo raiz
	const displayCurrent = useMemo(() => {
		const len = current.length;
		if (len === 0) return current;
		if (len >= 3) return current;
		const target = 3;
		return Array.from({length: target}, (_, i) => current[i % len]);
	}, [current]);

	// Montagem dinâmica das séries e métricas
	const {metricsLabels, chartSeries} = useMemo(() => {
		// Modo raiz
		if (!selectedTag) {
			const labelsCounts: Record<string, number> = {};
			const metrics: string[] = displayCurrent.map(item => {
				const base = getDisplayLabel(item);
				labelsCounts[base] = (labelsCounts[base] ?? 0) + 1;
				const n = labelsCounts[base];
				return n === 1 ? base : `${base} (${n})`;
			});
			const series: RadarSeries[] = [
				{label: "Preferencias", data: displayCurrent.map(d => d.pref ?? 0), fillArea: true}
			];
			return {metricsLabels: metrics, chartSeries: series};
		}

		// Seleção: duas séries
		const directSkills = resolveRelatedOfTag(selectedTag);
		const inverseSkills = allSkills.filter(s => (s.related ?? []).some((t: any) => {
			const tName = typeof t === 'string' ? t : (t.onSelect ?? t.name);
			return tName === selectedTag;
		}));

		const nameSet = new Set<string>();
		directSkills.forEach(s => nameSet.add(getDisplayLabel(s)));
		inverseSkills.forEach(s => nameSet.add(getDisplayLabel(s)));
		const baseLabels = Array.from(nameSet);

		const paddedLabels: string[] = [];
		const counts: Record<string, number> = {};
		const ensureUniquePush = (nm: string) => {
			counts[nm] = (counts[nm] ?? 0) + 1;
			const c = counts[nm];
			paddedLabels.push(c === 1 ? nm : `${nm} (${c})`);
		};

		const selectedSkill = allSkills.find(
			s => s.name.toString() === selectedTag || s.name.toString() === selectedTag
		);
		const selectedDispName = selectedSkill ? getDisplayLabel(selectedSkill) : selectedTag;

		baseLabels.forEach(nm => ensureUniquePush(nm));
		if (paddedLabels.length < 3) {
			const target = 3;
			const deficit = target - paddedLabels.length;
			for (let i = 0; i < deficit; i++) ensureUniquePush(selectedDispName);
		}

		const toMap = (arr: ISkill[]) => {
			const m = new Map<string, number>();
			arr.forEach(s => m.set(getDisplayLabel(s), s.pref ?? 0));
			return m;
		};
		const directMap = toMap(directSkills);
		const inverseMap = toMap(inverseSkills);

		const baseOf = (label: string) => label.replace(/\s*\(\d+\)$/, "");
		const directData = paddedLabels.map(nm => {
			const b = baseOf(nm);
			if (b === selectedDispName) return selectedSkill?.pref ?? 0;
			return directMap.get(b) ?? 0;
		});
		const inverseData = paddedLabels.map(nm => {
			const b = baseOf(nm);
			if (b === selectedDispName) return 0;
			return inverseMap.get(b) ?? 0;
		});

		const series: RadarSeries[] = [
			{
				label: selectedSkill ? getDisplayLabel(selectedSkill) : (selectedTag || "Principal"),
				data: directData,
				color: '#0033ff',
				fillArea: true,
			},
			{label: "Relacionados indiretamente", data: inverseData, color: '#89ffa2', hideMark: true},
		];

		return {metricsLabels: paddedLabels, chartSeries: series};
	}, [selectedTag, resolveRelatedOfTag, allSkills, displayCurrent]);

	// Labels exibidos no gráfico (métricas)
	const displayLabels = useMemo(() => metricsLabels, [metricsLabels]);

	// Força re-render quando labels exibidos mudarem devido à replicação
	const chartKey = useMemo(() => {
		const base = current.map(x => x.name).join('|');
		const disp = displayLabels.join('|');
		const ser = chartSeries.map(s => s.label).join('|');
		return `${base}__${disp}__${ser}`;
	}, [current, displayLabels, chartSeries]);

	const handleDrillDownByLabel = (labelName: string) => {
		const baseName = labelName.replace(/\s*\(\d+\)$/, "");
		const item = allSkills.find(s => getDisplayLabel(s) === baseName);
		if (!item) return;
		const tag = item.name.toString().trim();
		if (!tag) return;
		navigate({hash: `#${tag}`});
	};

	const handleBack = () => {
		if (location.hash) navigate(-1);
	};


	return (
		<Grid container size={12}>
			<Grid size={12}>
				<Typography variant={'subtitle1'}>Este graficos mostram minhas preferencias sobre
					tecnologias</Typography>
				<Stack direction="row" spacing={2} sx={{mb: 2}}>
					<ButtonGroup>
						<Button
							variant="contained"
							onClick={handleBack}
							disabled={!(location.hash && location.hash.length > 0)}
						>
							Voltar
						</Button>
						<Button
							variant="contained"
							onClick={() => {
								// Limpa para o nível raiz e remove o hash da URL
								navigate({hash: ''});
							}}
							disabled={!(location.hash && location.hash.length > 0)}>
							Limpar
						</Button>
					</ButtonGroup>
				</Stack>
			</Grid>
			<Grid container size={12} spacing={2}>
				<Grid size={{xs: 12, lg: 6}} sx={{p: 1}} component={Paper}>
					<RadarChart
						key={chartKey}
						height={350}
						series={chartSeries}
						shape={"circular"}
						allowReorder={'yes'}
						radar={{
							max: 100,
							metrics: displayLabels.map(x => x.toString()),
							labelGap: 5,
						}}
						skipAnimation
						onAreaClick={(_ev, v) => {
							if (v && typeof v.dataIndex === 'number' && v.dataIndex >= 0) {
								const idx = v.dataIndex % displayLabels.length;
								const labelName = displayLabels[idx];
								if (labelName) handleDrillDownByLabel(labelName);
							}
						}}
					/>
				</Grid>

				{selectedSkill && (
					<Grid size={{xs: 12, lg: 6}} sx={{p: 1}} component={Paper}>
						<Typography variant="h6" sx={{mb: 1}}>{getDisplayLabel(selectedSkill)}</Typography>
						<Stack spacing={1}>
							<Box>
								<Typography variant="caption" color="text.secondary">Minha Preferencia</Typography>
								<Typography variant="body1">{selectedSkill.pref} / 100</Typography>
							</Box>
							{selectedSkill.comments != null && selectedSkill.comments.length > 0 && (
								<Box>
									<Typography variant="caption" color="text.secondary">Comentários</Typography>
									{selectedSkill.comments.map((comment, index) => (
										<Typography variant="body2" key={index}>{comment}</Typography>
									))}
								</Box>
							)}
							{selectedSkill.xp && (
								<Box>
									<Typography variant="caption" color="text.secondary">Tempo de
										experiencia (aproximado)</Typography>
									<Typography variant="body1">{selectedSkill.xp.format('YYYY-MM')}
										{(() => {
											const years = dayjs().diff(selectedSkill.xp!, 'year', true);
											const yearsFmt = Math.floor(years * 10) / 10; // 1 casa decimal
											return (
												<Typography variant="caption"
												            sx={{pl: 0.5}}
												            component={'span'}
												            color="text.secondary">(~{yearsFmt} anos)</Typography>
											);
										})()}</Typography>

								</Box>
							)}
							{selectedSkill.related && selectedSkill.related.length > 0 && (
								<Grid container size={12}>
									<Typography variant="caption" color="text.secondary">Relacionados</Typography>
									<Grid size={12} spacing={1} sx={{mt: 0.5, flexWrap: 'wrap', gap: 1}}>
										{selectedSkill.related.map((r: any, idx: number) => {
											const rel = typeof r === 'string' ? {name: r} : r;
											const display = (rel.displayValue ?? rel.name)?.toString();
											const tag = (rel.onSelect ?? rel.name)?.toString();
											return (
												<Grid size={12}
												      key={idx}>
													<Link component={RouterLink}
													      to={{hash: `${tag}`}}>
														{display}
													</Link>
												</Grid>
											);
										})}
									</Grid>
								</Grid>
							)}
						</Stack>
					</Grid>
				)}
			</Grid>

		</Grid>
	)
}