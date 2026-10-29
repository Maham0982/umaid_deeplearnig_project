const input=document.getElementById('file-input');
const dropzone=document.getElementById('dropzone');
const browseBtn=document.getElementById('browse-btn');
const classifyBtn=document.getElementById('classify-btn');
const emptyState=document.getElementById('empty-state');
const previewState=document.getElementById('preview-state');
const previewImage=document.getElementById('preview-image');
const fileName=document.getElementById('file-name');
const message=document.getElementById('message');
const result=document.getElementById('result');
const resultEmpty=document.getElementById('result-empty');
let selectedFile=null, previewUrl=null;
function showMessage(text,error=false){message.textContent=text;message.classList.toggle('error',error);message.hidden=false}
function clearMessage(){message.hidden=true;message.textContent=''}
function clearSelection(){selectedFile=null;if(previewUrl)URL.revokeObjectURL(previewUrl);previewUrl=null;input.value='';previewImage.removeAttribute('src');previewState.hidden=true;emptyState.hidden=false;classifyBtn.disabled=true;result.hidden=true;resultEmpty.hidden=false;clearMessage()}
function chooseFile(file){clearMessage();result.hidden=true;resultEmpty.hidden=false;if(!file)return;if(!file.type.match(/^image\/(jpeg|png|webp)$/))return showMessage('Please choose a JPG, PNG or WEBP image.',true);if(file.size>10*1024*1024)return showMessage('This image is larger than 10 MB. Please choose a smaller file.',true);if(previewUrl)URL.revokeObjectURL(previewUrl);selectedFile=file;previewUrl=URL.createObjectURL(file);previewImage.src=previewUrl;fileName.textContent=file.name;emptyState.hidden=true;previewState.hidden=false;classifyBtn.disabled=false}
browseBtn.addEventListener('click',e=>{e.stopPropagation();input.click()});
dropzone.addEventListener('click',e=>{if(!e.target.closest('button'))input.click()});
dropzone.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();input.click()}});
input.addEventListener('change',()=>chooseFile(input.files[0]));
['dragenter','dragover'].forEach(n=>dropzone.addEventListener(n,e=>{e.preventDefault();dropzone.classList.add('dragover')}));
['dragleave','drop'].forEach(n=>dropzone.addEventListener(n,e=>{e.preventDefault();dropzone.classList.remove('dragover')}));
dropzone.addEventListener('drop',e=>chooseFile(e.dataTransfer.files[0]));
document.getElementById('remove-btn').addEventListener('click',e=>{e.stopPropagation();clearSelection()});
document.getElementById('reset-btn').addEventListener('click',clearSelection);
classifyBtn.addEventListener('click',async()=>{if(!selectedFile)return;classifyBtn.disabled=true;classifyBtn.innerHTML='Processing image <span>…</span>';clearMessage();result.hidden=true;resultEmpty.hidden=false;try{const fd=new FormData();fd.append('image',selectedFile);const response=await fetch('/api/predict',{method:'POST',body:fd});const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.message||'The prediction API is not connected yet.');document.getElementById('result-title').textContent=data.label||data.prediction||'Prediction received';document.getElementById('result-copy').textContent=data.confidence!=null?`Model confidence: ${(Number(data.confidence)>1?Number(data.confidence):Number(data.confidence)*100).toFixed(1)}%. This value was returned by the connected model.`:'This label was returned by the connected model.';result.hidden=false;resultEmpty.hidden=true}catch(err){showMessage(err.message||'Could not reach the prediction service. Please check the model API configuration.',true)}finally{classifyBtn.disabled=!selectedFile;classifyBtn.innerHTML='Run classification <span>↗</span>'}});