export interface LabelIcon {
    name: string;
    animation?: string;
}
export declare namespace LabelIcon {
    function is(val: unknown): val is LabelIcon;
}
export declare type LabelPart = string | LabelIcon;
export declare class LabelParser {
    /**
     * Returns an array with parts of the given text.
     * These parts are of type LabelPart which can be either a string or a LabelIcon.
     * For splitting up the giving text the parser follows this rule:
     * The text gets parsed for the following pattern: $(iconName~iconAnimation).
     * If the parser finds such pattern a new LabelIcon object
     * { name: 'iconName', animation: 'iconAnimation'} is added to the returned array.
     * iconName can be for instance the name of an icon of e.g. FontAwesome and the (optional) iconAnimation
     * the name of an animation class which must be supported by the particular icon toolkit.
     *
     * Every string before, between or after such icon patterns gets also added to the array
     * before, between or after the related LabelIcon.
     *
     * @param text - the label text to parse
     */
    parse(text: string): LabelPart[];
}
//# sourceMappingURL=label-parser.d.ts.map