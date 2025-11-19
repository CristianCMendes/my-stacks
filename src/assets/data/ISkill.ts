import type {Dayjs} from "dayjs";
import type {IWork} from "@assets/data/IWork.ts";

export interface StackName {
	Backend: true | ISkill,
	Bootstrap: true | ISkill,
	Frontend: true | ISkill,
	Database: true | ISkill,
	Cloud: true | ISkill,
	Javascript: true | ISkill,
	Typescript: true | ISkill,
	React: true | ISkill,
	Csharp: true | ISkill,
	Vercel: true | ISkill,
	Container: true | ISkill,
	Docker: true | ISkill,
	DockerCompose: true | ISkill,
	Git: true | ISkill,
	Oracle: true | ISkill,
	MySql: true | ISkill,
	MariaDb: true | ISkill,
	SqlServer: true | ISkill,
	MongoDb: true | ISkill,
	Sqlite: true | ISkill,
	Html: true | ISkill,
	Python: true | ISkill,
	NodeJs: true | ISkill,
	Postgresql: true | ISkill,
	Redis: true | ISkill,
	Aws: true | ISkill,
	AwsEc2: true | ISkill,
	AwsEcs: true | ISkill,
	AwsEcr: true | ISkill,
	AwsRds: true | ISkill,
	AwsS3: true | ISkill,
	Vite: true | ISkill,
	DotNet: true | ISkill,
	EfCore: true | ISkill,
	AspNet: true | ISkill,
	WebApi: true | ISkill,
	RestfulApi: true | ISkill,
	MaterialUi: true | ISkill,
	OpenApi: true | ISkill,
	Azure: true | ISkill,
	AzureApps: true | ISkill,
	Msal: true | ISkill,

	[key: string]: true | ISkill
}


export interface ISkill {
	name: keyof StackName,
	displayName?: string,
	/**
	 * Meu indice de preferencia, de 0 a 100
	 */
	pref?: number,
	/**
	 * Se deve ser exibido no inicio
	 */
	isRoot?: true,
	/**
	 * Comentarios adicionais sobre a stack
	 */
	comments?: string[],
	/**
	 * Cenarios que utilizei
	 */
	uses?: IWork[],
	/**
	 * Data que teoricamente comecei a usar(especulando pela data que eu tenho o primeiro projeto no github)
	 */
	xp?: Dayjs,
	related?: (keyof StackName | Pick<ISkill, 'name' | 'pref' | 'displayName'>)[],
}