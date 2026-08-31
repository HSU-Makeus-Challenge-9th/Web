export interface Credit {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
}

export interface CrewMember {
  id: number;
  name: string;
  profile_path: string | null;
  job: string;
  department: string;
}
