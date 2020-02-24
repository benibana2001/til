import * as React from "react"

// A Validator function will take in the field name, the values for the whole form, and an optional argument specific to the function.
//   A string containing the validation error message will be returned. 
//   If the field is valid, a blank string will be returned.
export type Validator = (
    fieldName: string,
    values: IValues,
    args?: any
) => string

export const required: Validator = (
    fieldName: string,
    values: IValues,
    args?: any
): string =>
    values[fieldName] === undefined ||
        values[fieldName] === null ||
        values[fieldName] === ""
        ? "This must be populated"
        : ""

export const minLength: Validator = (
    fieldName: string,
    values: IValues,
    length: number
): string =>
    values[fieldName] && values[fieldName].length < length
        ? `This must be at least ${length} characters`
        : ""

interface IValidation {
    validator: Validator
    args?: any
}

interface IValidationProp {
    [key: string]: IValidation | IValidation[]
}

interface IFormProps {
    defaultValues: IValues
    // The validationRules prop is an indexable key/value type,
    //   where the key is the field name and the value is one or more validation rules of type IValidation.
    validationRules: IValidationProp
}
// The errors state is an indexable key/value type 
//   where the key is the field name and the value is an array of validation error messages.
interface IErrors {
    [key: string]: string[]
}

interface IState {
    values: IValues
    errors: IErrors
}

interface IFieldProps {
    name: string
    label: string
    type?: "Text" | "Email" | "Select" | "TextArea"
    options?: string[]
}

// This is an indexable key/value type that has a string type key and an any type value. 
//   Could be this:
//     { name: "", email: "", reason: "Support", notes: "" }
export interface IValues { [key: string]: any }

interface IFormContext {
    errors: IErrors
    values: IValues
    setValue?: (fieldName: string, value: any) => void
    validate?: (filedName: string, value: any) => void
}

const FormContext = React.createContext<IFormContext>({
    errors: {},
    values: {}
})

export class Form extends React.Component<IFormProps, IState> {
    constructor(props: IFormProps) {
        super(props)
        const errors: IErrors = {}
        Object.keys(props.defaultValues).forEach(fieldName => {
            errors[fieldName] = []
        })
        this.state = {
            errors,
            values: props.defaultValues
        }
    }
    // This is going to validate a field, calling the specified validator function. 
    //   The method will return an array of validation error messages.
    private validate = (
        fieldName: string,
        value: any
    ): string[] => {
        const rules = this.props.validationRules[fieldName]
        const errors: string[] = []
        //  when there are multiple validation rules.
        if (Array.isArray(rules)) {
            rules.forEach(rule => {
                const error = rule.validator(
                    fieldName,
                    this.state.values,
                    rule.args
                )
                if (error) errors.push(error)
            })
        } else {
            if (rules) {
                const error = rules.validator(fieldName, this.state.values, rules.args)
                if (error) {
                    errors.push(error)
                }
            }
        }
        // We spread the old errors state into a new object, and then add the new errors for the field.
        const newErrors = { ...this.state.errors, [fieldName]: errors }
        this.setState({ errors: newErrors })
        return errors
    }

    private setValue = (fieldName: string, value: any) => {
        // Use rest parameters to set new value.
        const newValues = { ...this.state.values, [fieldName]: value }
        this.setState({ values: newValues })
    }

    public static Field: React.SFC<IFieldProps> = props => {
        const { name, label, type, options } = props

        const handleChange = (
            e:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>
                | React.ChangeEvent<HTMLSelectElement>,
            context: IFormContext
        ) => {
            if (context.setValue) context.setValue(props.name, e.currentTarget.value)
        }
        // The handler's first parameter, e, is the React blur event handler parameter. 
        const handleBlur = (
            e:
                | React.FocusEvent<HTMLInputElement>
                | React.FocusEvent<HTMLTextAreaElement>
                | React.FocusEvent<HTMLSelectElement>,
            context: IFormContext
        ) => {
            if (context.validate) context.validate(props.name, e.currentTarget.value)
        }
        return (
            <FormContext.Consumer>
                {context => (
                    <div className="form-group">
                        <label htmlFor={name}>{label}</label>
                        {(type === "Text" || type === "Email") && (<input type={type.toLowerCase()} id={name} value={context.values[name]} onChange={e => handleChange(e, context)} onBlur={e => handleBlur(e, context)} />)}
                        {type === "TextArea" && (<textarea id={name} value={context.values[name]} onChange={e => handleChange(e, context)}  onBlur={e => handleBlur(e, context)}/>)}
                        {type === "Select" && (
                            <select value={context.values[name]} onChange={e => handleChange(e, context)} onBlur={e => handleBlur(e, context)}>
                                {options &&
                                    options.map(option => (<option key={option} value={option}>{option}</option>))}</select>
                        )}
                        {context.errors[name].length > 0 &&
                            context.errors[name].length > 0 &&
                            context.errors[name].map(error => (
                                <span key={error} className="form-error">{error}</span>
                            ))}
                    </div>
                )}
            </FormContext.Consumer>
        )
    }

    public render() {
        //  Create the context value containing the values from the state
        const context: IFormContext = {
            errors: this.state.errors,
            setValue: this.setValue,
            validate: this.validate,
            values: this.state.values
        }
        return (
            <FormContext.Provider value={context}>
                <form className="form" noValidate={true}>
                    {this.props.children}
                </form>
            </FormContext.Provider>
        )
    }
}

Form.Field.defaultProps = {
    type: "Text"
}

