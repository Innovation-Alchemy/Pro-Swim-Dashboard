export interface ListOfContent {
  title: string;
  description: string;
  image: string | null;
}

export interface SectionModel {
  id: number;
  level_id: string;
  title: string;
  markdown_text: string;
  is_active: number;
  list_of_content: ListOfContent[];
}



export interface LearnToSwimModel {
  id: number;
  title: string;
  markdown_text: string;
  header_image: string | null;
  is_active: number;
  sections: SectionModel[];
}

export const fromJsonToLearnToSwim = (json: any): LearnToSwimModel => {
  return {
    id: json.id,
    title: json.title,
    markdown_text: json.markdown_text,
    header_image: json.header_image,
    is_active: json.is_active,
    sections: json.sections.map(
      (section: any): SectionModel => ({
        id: section.id,
        level_id: section.level_id,
        title: section.title,
        markdown_text: section.markdown_text,
        is_active: section.is_active,
        list_of_content: section.list_of_content.map(
          (content: any): ListOfContent => ({
            title: content.title,
            description: content.description,
            image: content.image || null,
          })
        ),
      })
    ),
  };
};
