(function readyJS(win,doc){

    if(document.querySelectorAll('.deletar')){
        for(let i=0; i< doc.querySelectorAll('.deletar').length; i++){
            doc.querySelectorAll('.deletar')[i].addEventListener('click',function(event){
                if(confirm("Tem Certeza que deseja apagar ?")){
                    return true;
                }else{
                    event.preventDefault();
                }
            });
        }
    }                         
})(window,document);