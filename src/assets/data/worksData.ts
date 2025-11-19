import type {IWork, IWorkName} from "@assets/data/IWork.ts";

const Verifica: IWork = {
	name: "Verifica",
	description: `Aplicação Web desenvolvido no datacenter da empresa, a aplicação foi desenvolvida para 
			emissão de etiquetas de gondola de forma mobile, depois foi incrementada com auditoria de presença,
			auditoria de validades, alteração de dados do ERP em massa e algumas outras funcionalidades.`,
	feats: [
		"Emissão de etiquetas a partir de coletor android, compativel com impressora portatil e utilizando mesmas Views do ERP",
		"Auditoria de validades",
		"Auditoria de presença",
		"Alteração de dados do ERP em massa",
	],
	where: "Lider Atacadista",
}

const AegisCloud: IWork = {
	name: "AegisCloud",
	description: `Aplicação cloud desenvolvida para gerenciamento orçamento, com ferramentas para barrar compras que 
	estourem o limite`,
	feats: [
		"Gestão sobre orçamentos por departamento/area",
		"Controle de aprovações por departamento/area",
		"Workflow de compra, sem autorização do gestor da area do custo não é possivel comprar",
		"Controle de contratos"
	],
	where: "Lider Atacadista"
}

const AgendaCorporativa: IWork = {
	name: "AgendaCorporativa",
	description: `Aplicação desenvolvida no datacenter da empresa, a agenda de contatos se atualiza automaticamente com
	 quaisquer alterações feitas nos dados dentro do active directory refletia na agenda`,
	feats: [
		"Atualização automatica ao alterar dados no active directory",
		"Login via MSAL, utilizando o SSO do windows",
		"Visualizaçaõ de contatos com filtros simples e avançados",
		"Informações complexas, contendo todas informações de contato, e com informações de gestores"
	],
	where: "Lider Atacadista"
}

const worksData = {
	Verifica,
	AegisCloud,
	AgendaCorporativa,
	AuraApprove: true,
	ConvenioWeb: true,
	DataSpectrum: true,
	MgvShareFix: true,
	PontoSenior: true,
	X5SyncService: true
} as IWorkName

export default worksData

