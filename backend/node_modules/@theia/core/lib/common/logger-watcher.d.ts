import { Event } from './event';
import { ILoggerClient, ILogLevelChangedEvent } from './logger-protocol';
export declare class LoggerWatcher {
    getLoggerClient(): ILoggerClient;
    private onLogLevelChangedEmitter;
    get onLogLevelChanged(): Event<ILogLevelChangedEvent>;
    fireLogLevelChanged(event: ILogLevelChangedEvent): void;
}
//# sourceMappingURL=logger-watcher.d.ts.map