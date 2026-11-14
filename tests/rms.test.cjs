const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const script=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].at(-1)[1];
function harness(){
  const nodes=new Map(),node=id=>{
    if(!nodes.has(id))nodes.set(id,{id,value:'',dataset:{id:id.replace(/^(?:input|unit|slider)-/,'')},
      type:id.startsWith('slider-')?'range':'text',handlers:{},addEventListener(type,fn){this.handlers[type]=fn;}});
    return nodes.get(id);
  };
  for(const id of ['current','field','thickness','voltage','n','rh'])for(const prefix of ['input-','slider-','unit-'])node(prefix+id);
  node('mode-select');
  let ready;
  const document={activeElement:null,getElementById:node,addEventListener:(event,fn)=>{ready=fn;},
    querySelectorAll:selector=>[...nodes.values()].filter(n=>selector.includes('.input-field')? /^(?:input|slider)-/.test(n.id):n.id.startsWith('unit-')||n.id==='mode-select')};
  vm.runInNewContext(script,{document});ready();
  return {node,change(id,value,type='change'){const n=node(id);n.value=String(value);document.activeElement=type==='input'?n:null;n.handlers[type]({target:n});document.activeElement=null;},peak(id){return 10**Number(node('slider-'+id).value);}};
}
function near(actual,expected,tol=1e-4){assert(Math.abs(Number(actual)-expected)<tol,`${actual} vs ${expected}`);}
test('1 A peak displays 1/sqrt(2) A RMS and returning to peak preserves it',()=>{
  const h=harness();h.change('input-current',1,'input');h.change('mode-select','peak');
  const density=h.node('input-n').value,coefficient=h.node('input-rh').value,voltagePeak=h.peak('voltage');
  h.change('mode-select','rms');near(h.node('input-current').value,1/Math.sqrt(2));
  near(h.node('input-voltage').value,voltagePeak/Math.sqrt(2)*1000,.01);
  assert.equal(h.node('voltage-mode-badge').textContent,'rms');
  assert.equal(h.node('input-n').value,density);assert.equal(h.node('input-rh').value,coefficient);
  h.change('mode-select','peak');near(h.node('input-current').value,1);near(h.peak('current'),1);
});
test('RMS current and voltage inputs convert back to peak internally',()=>{
  const h=harness();h.change('mode-select','rms');h.change('input-current',1,'input');
  near(h.peak('current'),Math.sqrt(2),1e-12);
  h.change('input-voltage',2,'input');near(h.peak('voltage'),.002*Math.sqrt(2),1e-12);
  h.change('mode-select','peak');near(h.node('input-current').value,Math.sqrt(2),.001);
  near(h.node('input-voltage').value,2*Math.sqrt(2),.001);
});
test('unit changes and sliders use the same peak-based state',()=>{
  const h=harness();h.change('input-current',1,'input');h.change('mode-select','rms');h.change('unit-current','mA');
  near(h.node('input-current').value,1000/Math.sqrt(2),.1);
  h.change('input-current',500,'input');near(h.peak('current'),.5*Math.sqrt(2),1e-12);
  h.change('slider-current',0,'input');h.change('unit-current','A');near(h.node('input-current').value,1/Math.sqrt(2));
  h.change('mode-select','DC');near(h.node('input-current').value,1);
});
test('Ohm*cm/G unit converts by 100 m^3/C and negative R_H sign is preserved across n and slider edits',()=>{
  const h=harness();
  h.change('input-rh',-0.01,'input');
  h.change('unit-rh','Ohm·cm/G');
  near(Number(h.node('input-rh').value),-1e-4,1e-7);
  h.change('unit-rh','m³/C');
  h.change('input-n',1e18,'input');
  assert(Number(h.node('input-rh').value) < 0, `expected negative R_H after editing n, got ${h.node('input-rh').value}`);
  h.change('slider-rh',-6,'input');
  near(Number(h.node('input-rh').value),-1e-6,1e-9);
});
