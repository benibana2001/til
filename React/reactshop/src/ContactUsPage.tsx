import * as React from "react"

import ContactUs from "./ContactUs"
import { IValues, ISubmitResult } from "./Form"

class ContractUsPage extends React.Component<{}, {}> {
    private handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
        await wait(1000)
        return {
            // errors: {
                // email: ["Some is wrong with this"]
            // },
            success: true
        }
    }
    public render() {
        return (
            <div className="page-container">
                <h1>Contact Us</h1>
                <p>If you enter your details we'll get back to you as soon as we can.</p>
                <ContactUs onSubmit={this.handleSubmit} />
            </div>
        )
    }
}

const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export default ContractUsPage