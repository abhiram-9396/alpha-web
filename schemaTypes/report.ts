export default {
    name: 'report',
    type: 'document',
    title: 'Report',
    fields: [
      { 
        name: 'title', 
        type: 'string', 
        title: 'Title' 
      },
      { 
        name: 'slug', 
        type: 'slug', 
        title: 'Slug',
        options: { source: 'title', maxLength: 96 }
      },
      {
        name: 'summary',
        type: 'text',
        title: 'Summary'
      },
      {
        name: 'heroImage',
        type: 'image',
        title: 'Hero Image',
        options: { hotspot: true }
      },
      {
        name: 'body',
        type: 'array',
        title: 'Body',
        of: [{ type: 'block' }]
      },
      {
        name: 'ctaLabel',
        type: 'string',
        title: 'CTA Label'
      },
      {
        name: 'ctaUrl',
        type: 'url',
        title: 'CTA URL'
      },
      {
        name: 'author',
        type: 'reference',
        title: 'Author',
        to: [{ type: 'author' }]
      }
    ]
  }
  