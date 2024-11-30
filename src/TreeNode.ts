export interface TreeNode {
    id: number,
    cHeight?: number,
    cWidth?: number,
    data: {
        name?: string,
        extra?: string,
        textClass?: string,
        hidden: boolean,
        isMarriage: boolean,
        class?: string
    }
    children?: Array<TreeNode>
}
