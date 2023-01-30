const rules = (message: string) => [
   {
      required : true,
      message : message,
      pattern: new RegExp(/^[0-9]+$/)
   }
]

const numberValidator = rules;

export default numberValidator;