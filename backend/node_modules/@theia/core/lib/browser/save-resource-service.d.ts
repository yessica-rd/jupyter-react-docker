/********************************************************************************
 * Copyright (C) 2022 Arm and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import { MessageService } from '../common';
import { Navigatable } from './navigatable-types';
import { Saveable, SaveableSource, SaveOptions } from './saveable';
import { Widget } from './widgets';
export declare class SaveResourceService {
    protected readonly messageService: MessageService;
    /**
     * Indicate if the document can be saved ('Save' command should be disable if not).
     */
    canSave(widget?: Widget): widget is Widget & (Saveable | SaveableSource);
    canSaveNotSaveAs(widget?: Widget): widget is Widget & (Saveable | SaveableSource);
    /**
     * Saves the document
     *
     * No op if the widget is not saveable.
     */
    save(widget: Widget | undefined, options?: SaveOptions): Promise<void>;
    canSaveAs(saveable?: Widget): saveable is Widget & SaveableSource & Navigatable;
    saveAs(sourceWidget: Widget & SaveableSource & Navigatable, options?: SaveOptions): Promise<void>;
}
//# sourceMappingURL=save-resource-service.d.ts.map