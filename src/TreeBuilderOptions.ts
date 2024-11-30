import {TreeNode} from "./TreeNode";
import TreeBuilder from "./TreeBuilder";

export interface TreeBuilderOptions {
    target?: string,
    debug?: boolean,
    width?: number,
    height?: number,
    hideMarriageNodes?: boolean,
    callbacks?: {
        nodeClick?: (name: string, extra: any, id: number) => {},
        nodeRightClick?: (name: string, extra: any, id: number) => {},
        marriageClick?: (extra: any, id: number) => {},
        marriageRightClick?: (extra: any, id: number) => {},
        nodeHeightSeparation?: (nodeWidth: number, nodeMaxHeight: number) => number,
        nodeRenderer?: (name: string, x: number, y: number, height: number, width: number, extra: any, id: number, nodeClass: any, textClass: any, textRenderer: any) => {},
        nodeSize?: (nodes: TreeNode[], width: number, textRenderer: any) => [number, number],
        nodeSorter?: (aName: string, aExtra: any, bName: string, bExtra: any) => {},
        textRenderer?: (name: string, extra: any, textClass: any) => {},
        marriageRenderer?: (x: number, y: number, height: number, width: number, extra: any, id: number, nodeClass: any) => {},
        marriageSize?: (nodes: TreeNode[], size: number) => number
    },
    margin?: {
        top: number,
        right: number,
        bottom: number,
        left: number
    },
    nodeWidth?: number,
    marriageNodeSize?: number,
    styles?: {
        node: string,
        marriageNode: string,
        linage: string,
        marriage: string,
        text: string
    }

}
