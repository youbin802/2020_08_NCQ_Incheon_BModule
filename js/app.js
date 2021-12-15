const log = console.log;
class App {
    constructor() {
        this.recipes=[];
        this.breadList=[];
        this.myRecipes=[];
        this.getJson()
    }

    async getJson() {
        await $.getJSON('js/recipes.json', data => {
            this.recipes = data;
            this.breadList = Object.keys(data);
        });
        this.pageDraw();
    }

    pageDraw() {
        const dom = document.querySelector(".bread-select-content");
        dom.innerHTML="";
        this.breadList.forEach(b=> {
            const div = document.createElement("div");
            div.innerHTML=`
            <button type="button" class="btn btn-outline-primary" data-idx="${b}">${b}</button>`;
            div.querySelector("button").addEventListener("click",e=> {
                const content = document.querySelector(".recipes-select-content .min-content");
                content.innerHTML="";
                const list = this.recipes[b].ingredients;
                const keys = Object.keys(list);
                this.cookBtnClick(b);
                const con = document.querySelector(".recipes-content");
                con.innerHTML="";
                $(".recipes-Bname").text(`${e.target.dataset.idx} 레시피 `);
   
                for(let i=0; i<=keys.length; i++) {
                    // 레시피 참고 자료
                    let key = keys[i];
                    if(key!=undefined) {
                        const div = document.createElement("div");
                        div.innerHTML=`<p>${key} : ${list[key]}</p>`;
                        con.appendChild(div);
                    }

                    if(key!=undefined) {
                        const div = document.createElement("div");
                        div.innerHTML=` 
                        <div class="input-group mb-3">
                            <p class="btn btn-outline-secondary" id="button-addon1">${key}</p>
                            <input type="number" value=0 id="recValue" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                        </div>`;
                        content.appendChild(div);
                        div.querySelector("input").addEventListener("input", e=> {
                            let val = e.target.value;
                            let name = div.querySelector("p").innerText;
                            
                            const check = this.myRecipes.find(x=>x.name == name);
                            if(check == undefined) {
                                this.myRecipes.push({name,val});
                            }else {
                                this.myRecipes.forEach(my=> {
                                    if(my.name == name) {
                                        my.val = val;  
                                    }
                                })
                            }
                            
                        })
                        // for(let i=0; i<=this.myRecipes.length; i++) {
                        //     log(this.myRecipes[i].name+","+Object.keys(this.recipes[b].ingredients)[i]);
                        // }
                        //   this.selectEvent();
                    }
                }
            })
            dom.appendChild(div);
        })
    }

    cookBtnClick(bread) {
        document.querySelector("#start").addEventListener("click",e=> {
            let list = Object.values(this.recipes[bread].ingredients);
            let idx=0;
            const dom = document.querySelector(".red-value");
            dom.innerHTML='';
            dom.style.display="block";
            list.forEach(l => {       
                let val =(l*10)/100;
                log(this.myRecipes)
                let myName = this.myRecipes[idx].name;
                log(myName);
                let myVal = this.myRecipes[idx].val;
                log(myName +":"+ myVal + ","+val+"---------------");
                // cookTime
                if(val <=myVal) {
                    this.standard(bread);
                }else {
                    log(myVal+"은"+(val-myVal)+"만큼 더 추가 해야함");
                    const div = document.createElement('div');
                    div.innerHTML=`
                    <p> - ${myName} : ${val-myVal}만큼 더 추가해야함</p>`;
                    dom.appendChild(div);
                }
                idx+=1;
            });
        
        });
    }

    standard(bread) {
        let recTime = this.recipes[bread].굽는시간;
        let myTime =document.querySelector("#cookTime").value;
        if(recTime ==myTime) {
            this.bakeStart('perfect');
        } else if(recTime > myTime) {
            this.bakeStart('undercooked');
        } else {
            this.bakeStart('burn');
        }
    }

    bakeStart(str) {
        let divText = "";
        switch (str) {
            case 'perfect':
              divText = 'div#test3';
              break;
            case "undercooked":
              divText = 'div#test5';
              break;
            case "burn":
               divText = 'div#test4';
              break;
          }
            
          $( "div#test1" ).fadeIn( 1600, function() {
            $( "div#test2" ).fadeIn( 1600 , function() {
                $(divText).fadeIn( 1600 );
            });
        });
        return false;
    }
}

window.onload=()=> {
    window.app = new App();
}
