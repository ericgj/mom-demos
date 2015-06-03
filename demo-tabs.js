'use strict';

import mori from 'mori';
import core from 'ericgj/mom/core';
import vdom from 'ericgj/mom/vdom';
import {tabs} from './app/tabs';
const {h} = vdom;

const atom = core.atom( {
  pages: [
    { name: "first",
      tab: { label: "First", href: "#1", name: "first" }
    },
    { name: "second",
      active: true,
      tab: { label: "Second", href: "#2", name: "second" }
    },
    { name: "third",
      tab: { label: "Third", href: "#3", name: "third" }
    }
  ]
});

const top = core.toCursor(atom);
top.listen( 'log', txlog );

const pageComponents = {
  first:  () => h('div'),
  second: () => h('div'),
  third:  () => h('div')
}

///////////////////////

core.root(
  atom,
  app,
  document.getElementById('target'),
  { pages: pageComponents }
);

function app(cursor, opts){
  return (
    h('div.pages', 
      core.build( tabs, cursor.refine('pages'), opts )
    )
  );
}

window.onpopstate = function(e){
  const loc = window.location.hash

  top.transact(['pages'], function(pages){
    return mori.reduce( function(acc,page){
        const href = mori.getIn(page,['tab','href'],null);
        return (
          mori.conj(acc, 
            mori.assoc(page, 'active', href == loc)
          )
        );
      }, mori.vector(), pages
    )
  });

}

function txlog(txdata,c){
  console.debug('path: %s from: %s  to: %s', 
                JSON.stringify(txdata.path), 
                JSON.stringify(core.mutable(txdata.oldValue)), 
                JSON.stringify(core.mutable(txdata.newValue))
              );
}

window.onpopstate();  // trigger initial sync with window.location


