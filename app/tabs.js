'use strict';

import f from './f';
import mori from 'mori';
import core from 'ericgj/mom/core';
import vdom from 'ericgj/mom/vdom';
import util from 'ericgj/mom/util';
const { compose } = f;
const { build } = core;
const { h } = vdom;
const { refineFirstWhere, refineAll } = util.cursor;
const { values, keysWhere } = util.mori;

// this belongs in util.mori ?
const accessor = (key,defval) => (seq) => mori.get(seq,key,defval);
const mutableMap = 
  compose(
    mori.intoArray,
    mori.map
  )
const mutableValues = compose( mori.intoArray, values );

// should be moved to './util', we can reuse this
const getActive = accessor('active',false);
const refineActive = refineFirstWhere.bind(null, (_,v) => getActive(v) ); 


/* ATOM STRUCTURE PROPOSED

    pages: [
      { name: 'page-name', 
        active: true,
        tab: { ... tab props ... }, 
        ... page props ... 
      },
      { ... }
    ]
*/
    
////////////////////////////////////////////////////////


// note page components are injected, keyed by page name
export function tabs(cursor, {pages}){
  
  const active = refineActive(cursor)
      , all = refineAll([],cursor)
      , pagename = active.get('name',null)
      , pagefn = pages && pagename && pages[pagename]
      
  return ([
    h('nav.tabs', 
      mutableMap( function(child){
        return build( tab, 
                      child.refine('tab'), 
                      { active: active && (active.state() === child.state()) }
                    )
      }, all ) 
    ),
    h('article.page', 
      pagefn && active ? [ build( pagefn, active ) ] : [] 
    )
  ]);
}


// the tab state goes 
//   (click) --> window.onpopstate --> cursor.transact(['pages'], fn) --> render
//
function tab(cursor, {active}){
  
  const [href, name, label] = mutableValues(cursor.get(), ['href','name','label'], null);

  return (
    h('a', {
        className: [ name || '', (!!active ? 'active' : '') ].join(' '),
        href: href
      }, 
      label
    )
  );

}


