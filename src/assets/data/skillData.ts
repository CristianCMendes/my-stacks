import type {ISkill, StackName} from "@assets/data/ISkill.ts";
import dayjs from "dayjs";

const AspNet: ISkill = {
	name: 'AspNet',
	pref: 90,
	comments: [],

	xp: dayjs('2020-11-01').startOf('day'),
	related: ["Backend", "DotNet", "Csharp", "WebApi", "RestfulApi"]
}

const Aws: ISkill = {
	name: 'Aws',
	pref: 85,
	comments: [],
	xp: dayjs('2022-11-01').startOf('day'),
	related: ["AwsEc2", "AwsEcs", "AwsEcr", "AwsRds", "AwsS3"]
};

const AwsEc2: ISkill = {
	name: 'AwsEc2',
	displayName: "Instância de computação em nuvem (AWS)",
	pref: 35,
	comments: [],
	xp: dayjs('2022-11-01').startOf('day'),
	related: ["Aws"]
};

const AwsEcr: ISkill = {
	name: 'AwsEcr',
	displayName: "Repositório de imagens em nuvem (AWS)",
	pref: 70,
	xp: dayjs('2025-05-01').startOf('day'),
	comments: [],
	related: ["Aws", "AwsEcs", "Docker"]
};

const AwsEcs: ISkill = {
	name: 'AwsEcs',
	displayName: "Gerenciador de containers em nuvem (AWS)",
	pref: 70,
	xp: dayjs('2025-05-01').startOf('day'),
	comments: [],
	related: ["Aws", "AwsEcr", "Docker"]
};

const AwsRds: ISkill = {
	name: 'AwsRds',
	displayName: "Banco de dados em nuvem (AWS)",
	pref: 40,
	xp: dayjs('2022-11-01').startOf('day'),
	comments: ["Banco em nuvem tenho preferencia pela vercel, pela simplicidade e pela facilidade de uso"],
	related: ["Aws", "Database"]
};

const AwsS3: ISkill = {
	name: 'AwsS3',
	xp: dayjs('2024-11-01').startOf('day'),
	displayName: "Armazenamento em nuvem (AWS)",
	pref: 70, comments: [], related: ["Aws"]
};

const Azure: ISkill = {
	name: 'Azure',
	pref: 70,
	comments: [],
	related: ["AzureApps"]
};

const AzureApps: ISkill = {
	name: 'AzureApps',
	pref: 100,
	comments: [],
	related: ["Msal"]
};

const Backend: ISkill = {
	name: 'Backend',
	pref: 100,
	isRoot: true,
	comments: [],
	related: ["Csharp",
		{name: "Python", pref: 30},
		{name: "Javascript", pref: 40},
		{name: "Typescript", pref: 75}]
};

const Bootstrap: ISkill = {name: 'Bootstrap', pref: 100, comments: [], related: ["Html", "Frontend"]};

const Cloud: ISkill = {name: 'Cloud', isRoot: true, pref: 70, comments: [], related: ["Aws", "Vercel", "Azure"]};

const Container: ISkill = {
	name: 'Container',
	pref: 100,
	comments: [],
	xp: dayjs('2024-11-01').startOf('day'),
	related: ["AwsEcr", "AwsEcs", "Docker", "DockerCompose"]
};

const Csharp: ISkill = {
	name: 'Csharp',
	pref: 100,
	xp: dayjs('2019-11-01').startOf('day'),
	comments: ["C# é minha principal linguagem de programação"],
	related: ['DotNet', 'AspNet', 'EfCore', 'WebApi', 'RestfulApi', 'Backend']
};

const Database: ISkill = {
	name: 'Database',
	pref: 70,
	isRoot: true,
	comments: [],
	xp: dayjs('2020-11-01').startOf('day'),
	related: [
		{name: 'Postgresql', pref: 100},
		{name: 'Redis', pref: 70},
		{name: 'SqlServer', pref: 70},
		{name: 'MySql', pref: 55},
		{name: 'MariaDb', pref: 50},
		{name: 'Sqlite', pref: 60},
		{name: 'MongoDb', pref: 55}
	]
};

const Docker: ISkill = {
	name: 'Docker',
	pref: 100,
	xp: dayjs('2024-11-01').startOf('day'),
	comments: [],
	related: ["Container", "DockerCompose"]
};

const DockerCompose: ISkill = {
	name: 'DockerCompose',
	xp: dayjs('2025-05-01').startOf('day'),
	pref: 100,
	comments: [],
	related: ["Container", "Docker"]
};

const DotNet: ISkill = {
	name: 'DotNet',
	pref: 90,
	xp: dayjs('2020-11-01').startOf('day'),
	comments: [],
	related: ["Backend", "Csharp"]
}

const EfCore: ISkill = {
	name: 'EfCore',
	displayName: "Entity FrameworkCore(EF core)",
	pref: 80,
	xp: dayjs('2023-05-01').startOf('day'),
	comments: [],
	related: ["Backend", "DotNet", "Csharp"]
}

const Frontend: ISkill = {
	name: 'Frontend',
	pref: 65,
	isRoot: true,
	xp: dayjs('2020-11-01').startOf('day'),
	comments: [],
	related: [
		{name: 'React', pref: 100},
		{name: 'Vite', pref: 100},
		{name: 'Typescript', pref: 100},
		{name: 'Javascript', pref: 45},
		{name: 'MaterialUi', pref: 100},
		{name: 'Bootstrap', pref: 50},
		{name: 'Html', pref: 60},
		'Vercel'
	]
};

const Git: ISkill = {
	name: 'Git',
	pref: 100,
	xp: dayjs('2019-11-01').startOf('day'),
	comments: [],
	related: ["Backend", "Frontend"]
}

const Html: ISkill = {
	name: 'Html',
	pref: 60,
	xp: dayjs('2020-11-01').startOf('day'),
	comments: [],
	related: ['Frontend']
};

const Javascript: ISkill = {
	name: 'Javascript',
	pref: 45,
	xp: dayjs('2023-11-01').startOf('day'),
	comments: ["Quando possivel, Typescript..."],
	related: ["Vercel", "Vite", "React", "NodeJs", "WebApi", "Backend", "MongoDb"]
}

const MariaDb: ISkill = {
	name: 'MariaDb',
	pref: 50,
	xp: dayjs('2021-11-01').startOf('day'),
	comments: [],
	related: ['Database']
};

const MaterialUi: ISkill = {name: 'MaterialUi', pref: 100, comments: [], related: ['Frontend', 'React']};

const MongoDb: ISkill = {
	name: 'MongoDb',
	pref: 55,
	xp: dayjs('2024-11-01').startOf('day'),
	comments: [],
	related: ['Database', 'Javascript', 'Typescript']
};

const MySql: ISkill = {
	name: 'MySql',
	pref: 55,
	xp: dayjs('2020-11-01').startOf('day'),
	comments: [],
	related: ['Database']
};

const Msal: ISkill = {
	name: 'Msal',
	displayName: "Autenticação microsoft",
	pref: 100,
	comments: [],
	related: ['Azure', 'AzureApps']
};

const NodeJs: ISkill = {
	name: 'NodeJs',
	pref: 70,
	xp: dayjs('2023-11-01').startOf('day'),
	comments: [],
	related: ['Backend', 'Javascript', 'Typescript', 'Vercel']
};

const Oracle: ISkill = {
	name: 'Oracle',
	pref: 40,
	xp: dayjs('2020-11-01').startOf('day'),
	comments: [],
	related: ['Database']
};

const OpenApi: ISkill = {
	name: 'OpenApi',
	pref: 80,
	xp: dayjs('2023-11-01').startOf('day'),
	comments: [],
	related: ['WebApi', 'RestfulApi', "AspNet", "Typescript", "Javascript"]
};

const Postgresql: ISkill = {
	name: 'Postgresql',
	pref: 100,
	xp: dayjs('2024-11-01').startOf('day'),
	comments: ["Em nuvem tenho preferencia para usar o Postgresql na Vercel, tanto por fornecer uma interface simples, como por ter um hardware gratuito relativamente bom"],
	related: ["Database",
		{name: 'Vercel', pref: 80},
		{name: 'AwsRds', pref: 40},
		{name: 'Sql', pref: 100}]
};

const Python: ISkill = {
	name: 'Python',
	pref: 40,
	xp: dayjs('2020-11-01').startOf('day'),
	comments: ["Apesar de ter um conhecimento bem amplo da linguagem, não gosto da questão da performance dela, então utilizo apenas para projetos que precisam ser feitos rápidamente e sem grandes demandas de performance"],
	related: ['Backend', 'RestfulApi', 'WebApi']
};

const React: ISkill = {
	name: 'React',
	pref: 100,
	comments: [],
	xp: dayjs('2023-11-01').startOf('day'),
	related: ["Frontend", {name: 'Javascript', pref: 30}, {name: 'Typescript', pref: 100}, {
		name: "MaterialUi",
		pref: 100
	}, "Vercel", "Vite"]
}

const Redis: ISkill = {
	name: 'Redis',
	pref: 70,
	xp: dayjs('2025-04-01').startOf('day'),
	comments: [],
	related: ["Database", "Vercel"]
};

const RestfulApi: ISkill = {
	name: 'RestfulApi',
	displayName: "Api Restful",
	pref: 50,
	comments: [
		"Tenho preferencia por WebApis, acredito que a documentação é mais facil de entender e manter"
	],
	xp: dayjs('2023-11-01').startOf('day'),
	related: [{name: 'Csharp', pref: 50},
		{name: 'Javascript', pref: 30},
		{name: 'Typescript', pref: 40},
		{name: 'Python', pref: 15},
	]
}

const Sqlite: ISkill = {
	name: 'Sqlite',
	pref: 60,
	xp: dayjs('2021-11-01').startOf('day'),
	comments: [],
	related: ['Database']
};

const SqlServer: ISkill = {
	name: 'SqlServer',
	pref: 70,
	xp: dayjs('2022-11-01').startOf('day'),
	comments: [],
	related: ['Database']
};

const Typescript: ISkill = {
	name: 'Typescript',
	pref: 100,
	xp: dayjs('2024-03-01').startOf('day'),
	comments: [],
	related: ["Javascript", "Vercel", "Vite", {name: "React", pref: 100}, "NodeJs", "WebApi", "Backend", "MongoDb"]
};

const Vercel: ISkill = {
	name: 'Vercel',
	pref: 90,
	xp: dayjs('2024-11-01').startOf('day'),
	comments: [],
	related: ["Frontend", "React", "Postgresql", "Redis", "Javascript", "Typescript", "NodeJs"]
};

const Vite: ISkill = {
	name: 'Vite',
	pref: 100,
	xp: dayjs('2024-11-01').startOf('day'),
	comments: [],
	related: ["Frontend", "React",
		{name: 'Javascript', pref: 40},
		{name: 'Typescript', pref: 80},
		"Vercel"]
};

const WebApi: ISkill = {
	name: 'WebApi',
	displayName: "Api Web",
	pref: 80,
	xp: dayjs('2023-11-01').startOf('day'),
	comments: ["Tenho preferencia por WebApi antes de RestfulApi, pois acredito que uma API bem documentada " +
	"consegue ser mais facil de manter e entender do que a arquitetura de HATEOAS"],
	related: [{name: 'Csharp', pref: 95},
		{name: 'Javascript', pref: 40},
		{name: 'Typescript', pref: 70},
		{name: 'Python', pref: 40}]
}

// Export ordenado alfabeticamente
export const data = {
	AspNet,
	Aws,
	AwsEc2,
	AwsEcr,
	AwsEcs,
	AwsRds,
	AwsS3,
	Azure,
	AzureApps,
	Backend,
	Bootstrap,
	Cloud,
	Container,
	Csharp,
	Database,
	Docker,
	DockerCompose,
	DotNet,
	EfCore,
	Frontend,
	Git,
	Html,
	Javascript,
	MariaDb,
	MaterialUi,
	MongoDb,
	MySql,
	Msal,
	NodeJs,
	OpenApi,
	Oracle,
	Postgresql,
	Python,
	React,
	Redis,
	RestfulApi,
	Sqlite,
	SqlServer,
	Typescript,
	Vercel,
	Vite,
	WebApi,
} as StackName