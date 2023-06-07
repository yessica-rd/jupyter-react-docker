import { Plugin, TimelineExt } from '../common';
import { RPCProtocol } from '../common/rpc-protocol';
import { Disposable } from './types-impl';
import { CommandRegistryImpl } from './command-registry';
import type { InternalTimelineOptions, Timeline } from '@theia/timeline/lib/common/timeline-model';
import * as theia from '@theia/plugin';
import { UriComponents } from '../common/uri-components';
export declare class TimelineExtImpl implements TimelineExt {
    readonly rpc: RPCProtocol;
    private readonly commands;
    readonly _serviceBrand: undefined;
    private readonly proxy;
    private providers;
    private itemsBySourceAndUriMap;
    constructor(rpc: RPCProtocol, commands: CommandRegistryImpl);
    $getTimeline(id: string, uri: UriComponents, options: theia.TimelineOptions, internalOptions?: InternalTimelineOptions): Promise<Timeline | undefined>;
    registerTimelineProvider(plugin: Plugin, scheme: string | string[], provider: theia.TimelineProvider): Disposable;
    private convertTimelineItem;
    private registerTimelineProviderCore;
}
//# sourceMappingURL=timeline.d.ts.map