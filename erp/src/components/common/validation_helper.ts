const ruleHandler = (message: string) =>
   [
      {
         required: true,
         message: message
      }, {
         whitespace: true,
      },
   ]

const  stringValidator = ruleHandler

export default stringValidator