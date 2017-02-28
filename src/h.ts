import {vnode, VNode, VNodeData} from './vnode';
import {array as isArray, primitive as isPrimitive} from './is';

function addNS(data: any, children: Array<VNode> | undefined, sel: string | undefined): void {
  data.ns = 'http://www.w3.org/2000/svg';
  if (sel !== 'foreignObject' && children !== undefined) {
    for (let i = 0; i < children.length; ++i) {
      let childData = children[i].data;
      if (childData !== undefined) {
        addNS(childData, (children[i] as VNode).children as Array<VNode>, children[i].sel);
      }
    }
  }
}

export function h(sel: string): VNode;
export function h(sel: string, data: VNodeData): VNode;
export function h(sel: string, text: string): VNode;
export function h(sel: string, children: Array<VNode>): VNode;
export function h(sel: string, data: VNodeData, text: string): VNode;
export function h(sel: string, data: VNodeData, children: Array<VNode>): VNode;
export function h(sel: any, b?: any, c?: any): VNode {
  var data: VNodeData = {}, children: any, text: any, i: number;
  if (c !== undefined) {
    data = b;
    if (isArray(c)) { children = c; }
    else if (isPrimitive(c)) { text = c; }
    else if (c && c.sel) { children = [c]; }
  } else if (b !== undefined) {
    if (isArray(b)) { children = b; }
    else if (isPrimitive(b)) { text = b; }
    else if (b && b.sel) { children = [b]; }
    else { data = b; }
  }
  if (isArray(children)) {
    for (i = 0; i < children.length; ++i) {
      if (isPrimitive(children[i])) children[i] = (vnode as any)(undefined, undefined, undefined, children[i]);
    }
  }
  if (
    sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
    (sel.length === 3 || sel[3] === '.' || sel[3] === '#')
  ) {
    addNS(data, children, sel);
  }
  return vnode(sel, data, children, text, undefined);
};
