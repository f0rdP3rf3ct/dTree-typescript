import TreeBuilder from "./TreeBuilder";
import {TreeNode} from "./TreeNode";
import {TreeBuilderOptions} from "./TreeBuilderOptions";
import * as _ from 'lodash';

const dTree = {
    init: (data: any, options?: TreeBuilderOptions): TreeBuilder => {


        const opts: TreeBuilderOptions = _.defaultsDeep(options || {}, {
            target: '#graph',
            debug: false,
            width: 600,
            height: 600,
            hideMarriageNodes: true,
            callbacks: {
                nodeClick: function (name: string, extra: any, id: any) {
                },
                nodeSize: function(nodes: TreeNode[], width: number, textRenderer: any) {
                    return TreeBuilder._nodeSize(nodes, width, textRenderer);
                },
                nodeRightClick: function (name: string, extra: any, id: any) {
                },
                marriageClick: function (extra: any, id: any) {
                },
                marriageRightClick: function (extra: any, id: any) {
                },
                nodeHeightSeparation: function (nodeWidth: number, nodeMaxHeight: number) {
                    return TreeBuilder._nodeHeightSeparation(nodeWidth, nodeMaxHeight);
                },
                nodeRenderer: function (name: string, x: number, y: number, height: number, width: number, extra: any, id: string, nodeClass: string, textClass: string, textRenderer: any) {
                    return TreeBuilder._nodeRenderer(name, x, y, height, width, extra,
                        id, nodeClass, textClass, textRenderer);
                },
                nodeSorter: function (aName: string, aExtra: any, bName: string, bExtra: any) {
                    return 0;
                },
                textRenderer: function (name: string, extra: any, textClass: string) {
                    return TreeBuilder._textRenderer(name, extra, textClass);
                },
                marriageRenderer: function (x: number, y: number, height: number, width: number, extra: any, id: any, nodeClass: string) {
                    return TreeBuilder._marriageRenderer(x, y, height, width, extra, id, nodeClass)
                },
                marriageSize: function (nodes: TreeNode[], size: number) {
                    return TreeBuilder._marriageSize(nodes, size)
                }
            },
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            nodeWidth: 100,
            marriageNodeSize: 10,
            styles: {
                node: 'node',
                marriageNode: 'marriageNode',
                linage: 'linage',
                marriage: 'marriage',
                text: 'nodeText'
            }
        });

        return new TreeBuilder(data, [], opts);
    }
}

export default dTree;
