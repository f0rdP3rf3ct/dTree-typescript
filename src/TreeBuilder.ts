import {TreeBuilderOptions} from "./TreeBuilderOptions";
import {TreeNode} from "./TreeNode";
import * as _ from 'lodash';
import * as d3 from 'd3';
import {TreeLayout, ZoomBehavior, ZoomedElementBaseType} from "d3";

export default class TreeBuilder {

    private _root: TreeNode;
    private _siblings: TreeNode[];
    private _opts: TreeBuilderOptions;
    private readonly _allNodes: TreeNode[];

    private readonly _nodeSize: [number, number];
    private readonly _marriageSize: number;

    // d3
    private _tree: TreeLayout<any>;
    private _zoom: ZoomBehavior<ZoomedElementBaseType, unknown>;

    // svg
    private _g: any;

    constructor(root: TreeNode, siblings: TreeNode[], opts: TreeBuilderOptions) {
        this._root = root;
        this._siblings = siblings;
        this._opts = opts;

        this._allNodes = this._flatten(root);

        // determine normal node sizes
        this._nodeSize = opts.callbacks.nodeSize(this._filterHiddenNorMarriedNodes(this._allNodes), opts.nodeWidth, opts.callbacks.textRenderer);

        // determine marriage node sizes
        this._marriageSize = opts.callbacks.marriageSize(this._filterMarriageNodes(this._allNodes), opts.marriageNodeSize)
    }

    /**
     * DEFAULTS START
     */

    /**
     * @param nodes
     * @private
     */
    private _filterHiddenNorMarriedNodes(nodes: TreeNode[]): TreeNode[] {

        if (nodes.length === 0) {
            return [];
        }

        const predicate = (node: TreeNode) => {
            return !(node.data?.hidden || _.get(node as object, 'data.isMarriage'))
        };
        return _.filter(nodes, predicate)
    }

    /**
     * @param nodes
     * @private
     */
    private _filterMarriageNodes(nodes: TreeNode[]): TreeNode[] {
        const predicate = (node: TreeNode) => {
            return !node.data?.hidden && _.get(node, 'data.isMarriage')
        };
        return _.filter(nodes, predicate) as TreeNode[];
    }


    /**
     * Flatten all nodes to an array
     * @param root
     * @private
     */
    private _flatten(root: TreeNode) {
        let n: TreeNode[] = [];
        let i: number = 0;

        function recurse(node: TreeNode) {
            if (node.children) {
                node.children.forEach(recurse);
            }
            if (!node.id) {
                node.id = ++i;
            }
            n.push(node);
        }

        recurse(root);
        return n;
    }

    private _update(root: any) {
        /**
        let opts = this._opts;
        let allNodes = this._allNodes;
        let nodeSize = this._nodeSize;
        let marriageSize = this._marriageSize;

        let treeNodes = this._tree(root);
        let links = treeNodes.links();

        // Create the link lines
        this._g.selectAll('.link')
            .data(links)
            .enter()
            .filter(l => l.target.data.noParent)

        ;
        */
    }

    /**
     * @param nodeWidth
     * @param nodeMaxHeight
     */
    static _nodeHeightSeparation(nodeWidth: number, nodeMaxHeight: number): number {
        return nodeMaxHeight + 25;
    }

    /**
     *
     * @param name
     * @param x
     * @param y
     * @param height
     * @param width
     * @param extra
     * @param id
     * @param nodeClass
     * @param textClass
     * @param textRenderer
     */
    static _nodeRenderer(name: string, x: number, y: number, height: number, width: number, extra: any, id: string, nodeClass: string, textClass: string, textRenderer: any): string {
        let node = '';
        node += '<div ';
        node += 'style="height:100%;width:100%;" ';
        node += 'class="' + nodeClass + '" ';
        node += 'id="node' + id + '">\n';
        node += textRenderer(name, extra, textClass);
        node += '</div>';
        return node;
    }

    /**
     * @param name
     * @param extra
     * @param textClass
     */
    static _textRenderer(name: string, extra: any, textClass: string): string {
        let node = '';
        node += '<p ';
        node += 'align="center" ';
        node += 'class="' + textClass + '">\n';
        node += name;
        node += '</p>\n';
        return node;
    }

    /**
     * @param x
     * @param y
     * @param height
     * @param width
     * @param extra
     * @param id
     * @param nodeClass
     */
    static _marriageRenderer(x: number, y: number, height: number, width: number, extra: any, id: string, nodeClass: string): string {
        return `<div style="height:100%" class="${nodeClass}" id="node${id}"></div>`
    }

    static _marriageSize(nodes: TreeNode[], size: number): [any, any] {
        _.map(nodes, (node: TreeNode) => {
            if (!node.data.hidden) {
                node.cHeight = size
                node.cWidth = size
            }
        })

        return [size, size]
    }

    /**
     * Creates temporary elements to measure the nodes height containing its text.
     *
     * @param nodes
     * @param width
     * @param textRenderer
     */
    static _nodeSize(nodes: TreeNode[], width: number, textRenderer: any): [number, number] {
        let maxWidth: number = 0;
        let maxHeight: number = 0;

        let tmpSVG = document.createElement('svg');
        document.body.appendChild(tmpSVG);

        _.map(nodes, (node: TreeNode) => {
            let container = document.createElement('div');

            if (node.data?.class) {
                container.setAttribute('class', node.data.class);
            }

            container.style.visibility = 'hidden';
            container.style.maxWidth = width + 'px';

            container.innerHTML = textRenderer(node.data.name, node.data.extra, node.data.textClass);
            tmpSVG.appendChild(container);

            let height = container.offsetHeight;
            tmpSVG.removeChild(container);

            maxHeight = Math.max(maxHeight, height)
            node.cHeight = maxHeight;

            if (node.data.hidden) {
                node.cWidth = 0;
            } else {
                node.cWidth = width;
            }
        });

        document.body.removeChild(tmpSVG);
        return [width, maxHeight];
    }

    /**
     * DEFAULTS END
     */


    /**
     * API
     */

    public create(): any {
        let opts: TreeBuilderOptions = this._opts;
        let allNodes: TreeNode[] = this._allNodes;
        let nodeSize: [number, number] = this._nodeSize;

        let width = opts.width + opts.margin.left + opts.margin.right;
        let height = opts.height + opts.margin.top + opts.margin.bottom;

        // Create zoom handler
        const zoom = d3.zoom()
            .scaleExtent([0.1, 10])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            })

        // Create the svg container
        const svg = d3.select(opts.target)
            .append('svg')
            .attr('viewBox', [0, 0, width, height])
            .call(zoom)

        // create svg group that holds all nodes
        const g = this._g = svg.append('g')

        // set zoom identity
        svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, opts.margin.top).scale(1))

        this._tree = d3.tree();
        this._tree.nodeSize([nodeSize[0] * 2, opts.callbacks.nodeHeightSeparation(nodeSize[0], nodeSize[1])]);
        this._tree.separation((a, b) => {
            if (a.data.hidden || b.data.hidden) {
                return 0.3;
            } else {
                return 0.6;
            }
        });

        // this._update(this.root);
    }

    public get nodeSize(): [number, number] {
        return this._nodeSize;
    }

    public get marriageSize(): number {
        return this._marriageSize;
    }

    public get allNodes(): TreeNode[] {
        return this._allNodes;
    }

    public get tree(): TreeLayout<any> {
        return this._tree;
    }

    public get marriageNodes(): TreeNode[] {
        return this._filterMarriageNodes(this.allNodes);
    }

}
