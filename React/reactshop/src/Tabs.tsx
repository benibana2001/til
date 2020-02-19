import * as React from "react"

interface IProps {
    headings: string[]
}
interface IState {
    activeHeading: string
}

class Tabs extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props)
        this.state = {
            activeHeading: this.existHeading() ? this.props.headings[0] : ""
        }
    }
    private existHeading = (): boolean => (this.props.headings && this.props.headings.length > 0)
    private handleTabClick = (e: React.MouseEvent<HTMLElement>) => {
        const li = e.target as HTMLElement
        const heading: string = li.textContent ? li.textContent : ""
        this.setState({ activeHeading: heading})
    }
    public render() {
        return (
            <ul className="tabs">
                {this.props.headings.map(heading => (
                    <li 
                    onClick={this.handleTabClick}
                    className={heading === this.state.activeHeading ? "active" : ""}>
                        {heading}
                    </li>
                ))}
            </ul>
        )
    }
}

export default Tabs