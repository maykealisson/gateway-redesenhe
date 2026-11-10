export class Recomendacao {
  google_id: string | null;
  name: string;
  author: string;
  date_of_publication?: string | null;
  description?: string | null;
  pages?: number | null;
  image_link?: string | null;
  categories?: string | null;
  score: number;
  motivo: string;
}
