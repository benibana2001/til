import Mediator from './MediatorInterface'
export default interface Colleague {
    setMediator (mediator: Mediator): void
    setColleagueEnabled (enabled: boolean): void
}