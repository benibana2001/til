import * as React from "react"

interface IProps {
    loading: boolean
}

const withLoader = <P extends object>(Component: any): React.SFC<P & IProps> => ({ loading, ...props }: IProps) => {
// const withLoader = <P extends object>(Component: React.ComponentType<P>): React.SFC<P & IProps> => ({ loading, ...props }: IProps) => {
    // console.log(loading)
    // console.log(props)
    console.log(Component)
    return (
        loading ? (
            <div className="loader-overlay">
                <div className="loader-circle-wrap">
                    <div className="loader-circle" />
                </div>
            </div>
        ) : (
                <Component {...props} />
            )
        // null

    )
}

export default withLoader