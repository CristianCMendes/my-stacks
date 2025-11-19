type WhereWork = 'Pessoal' | 'Lider Atacadista' | 'Outros'

export interface IWorkName {
	Verifica: true | IWork,
	AuraApprove: true | IWork,
	AegisCloud: true | IWork,
	DataSpectrum: true | IWork,
	AgendaCorporativa: true | IWork,
	ConvenioWeb: true | IWork,
	PontoSenior: true | IWork,
	MgvShareFix: true | IWork,
	X5SyncService: true | IWork,

	[key: string]: true | IWork
}

export interface IWork {
	name: keyof IWorkName,
	description: string,
	feats: string[],
	where: WhereWork,
}