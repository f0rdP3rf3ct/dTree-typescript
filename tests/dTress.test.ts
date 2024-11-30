import {dTree} from "../src/dTree";
import TreeBuilder from "../src/TreeBuilder";
import {TreeNode} from "../src/TreeNode";

describe('dTree tests', () => {
    test('should return callback values', () => {

        const treeBuilder: TreeBuilder = dTree.init([], {
            callbacks: {
                nodeSize: (): [number, number] => {
                    return [200, 200]
                },
                marriageSize: (): number => {
                    return 400
                }
            }
        });

        expect(treeBuilder.nodeSize).toStrictEqual([200, 200])
        expect(treeBuilder.marriageSize).toBe(400)
    });
    test('should only return marriage nodes', () => {

        const hiddenNode: TreeNode = {
            id: 2,
            data: {
                name: 'Test hidden Node',
                hidden: true,
                isMarriage: false
            }
        }

        const marriageNode: TreeNode = {
            id: 1,
            data: {
                name: 'Test Marriage Node',
                hidden: false,
                isMarriage: true,
            },
            children: [hiddenNode]
        }


        const treeBuilder: TreeBuilder = dTree.init(marriageNode);
        expect(treeBuilder.marriageNodes.length).toBe(1);
        expect(treeBuilder.marriageNodes[0].data.isMarriage).toBe(true);
    });
    test('should create a tree', () => {

        const testNode: TreeNode = {
            id: 1,
            data: {
                name: 'test',
                extra: 'test extra',
                textClass: 'text-class',
                hidden: false,
                isMarriage: false,
                class: 'some-class'
            }
        }

        const treeBuilder: TreeBuilder = dTree.init(testNode);
        treeBuilder.create();
    })
});
