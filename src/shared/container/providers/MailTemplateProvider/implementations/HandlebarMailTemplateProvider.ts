import handlebars from 'handlebars'

import fs from 'fs'
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO'
import IMailTemplateProvider from '../models/IMailTemplateProvider'

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, 'utf-8')

    const parsedTemplate = handlebars.compile(templateFileContent)

    return parsedTemplate(variables)
  }
}

export default HandlebarsMailTemplateProvider
