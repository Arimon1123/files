declare module 'libreoffice-convert' {
  interface LibreOfficeConverter {
    convert: (
      document: Buffer,
      format: string,
      filter: string | undefined,
      callback: (err: Error | undefined, any) => void
    ) => void
  }

  const converter: LibreOfficeConverter
  export = converter
}
