/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


options = (arrayOptions, element = null) => {
    
    if (arrayOptions != null) {
        arrayOptions.map((x) => {
            
            if (typeof(x.class) != 'undefined') {
                
                let split = x.class.split(" ");
                
                for (let i = 0; i < split.length; i++) {
                    element.classList.add(split[i]); 
                }
                
            }
            
            if (typeof(x.title) != 'undefined') {
                
                element.textContent = x.title;
                
            }
            
            if (typeof(x.id) != 'undefined') {
                
                element.id = x.id;
                
            }
            
            if (typeof(x.html) != 'undefined') {
                
                element.innerHTML = x.html;
                
            }
            
            if (typeof(x.for) != 'undefined') {
                
                element.for = x.for;
                
            }
            
            if (typeof(x.type) != 'undefined') {
                
                element.type = x.type;
                
            }
            
            if (typeof(x.name) != 'undefined') {
                
                element.name = x.name;
                
            }
            
            if (typeof(x.style) != 'undefined') {
                
                x.style = x.style.replace(/\s/g, '');
                
                let split1 = x.style.split(";");
                
                for (let i = 0; i < split1.length; i++) {
                    
                    let split2 = split1[i].split("=");
                
                    element.style[split2[0]] = split2[1];
                }
                
            }
            
            if (typeof(x.max) != 'undefined') {
                
                element.maxLength = x.max;
                
            }
            
            if (typeof(x.placeholder) != 'undefined') {
                
                element.placeholder = x.placeholder;
                
            }
            
            if (typeof(x.data) != 'undefined') {
                
                x.data = x.data.replace(/\s/g, '');
                
                let split1 = x.data.split(";");
                
                for (let i = 0; i < split1.length; i++) {
                    
                    let split2 = split1[i].split("=");
                
                    element.dataset[split2[0]] = split2[1];
                }
                
            }
            
            if (typeof(x.href) != 'undefined') {
                
                element.href = x.href;
                
            }

            if (typeof(x.step) != 'undefined') {
                
                element.step = x.step;
                
            }
            
            if (typeof(x.target) != 'undefined') {
                
                element.target = x.target;
                
            }
            
            if (typeof(x.disabled) != 'undefined') {
                
                element.disabled = x.disabled;
                
            }
            
            if (typeof(x.value) != 'undefined') {
                
                element.value = x.value;
                
            }
            
            if (typeof(x.label) != 'undefined') {
                
                element.textContent = x.label;
                
            }
            
            if (typeof(x.options) != 'undefined') {
                
                x.options.map((x) => {

                    m_options(x, element);
                    
                });
                
            }
            
            if (typeof(x.src) != 'undefined') {
                
                element.src = x.src;
                
            }
            
            if (typeof(x.alt) != 'undefined') {
                
                element.alt = x.alt;
                
            }

            if (typeof(x.maxVal) != 'undefined') {
                
                element.max = x.maxVal;
                
            }
            
        });
    }
    
    
    return element;
    
    
};

m_div = (arrayOptions = null, parent) => {
    let element = document.createElement("div");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_input = (arrayOptions = null, parent) => {
    let element = document.createElement("input");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_anchor = (arrayOptions = null, parent) => {
    
    let element = document.createElement("a");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_btn = (arrayOptions = null, parent) => {
    
    let element;
    
    arrayOptions.push({"class": "btn"});
    
    element = m_anchor(arrayOptions, parent);
    
    return element;
    
};

m_span = (arrayOptions = null, parent) => {
    let element = document.createElement("span");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_space = (parent) => {
  
    m_span([{"html": "&nbsp;"}], parent);
    
};

m_br = (arrayOptions = null, parent) => {
    let element = document.createElement("br");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_hr = (arrayOptions = null, parent) => {
    let element = document.createElement("hr");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_newLine = (parent) => {
  
    m_br([{}], parent);
    
};

m_big_title_h5 = (arrayOptions = null, parent) => {
    
    let element = document.createElement("h5");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_big_title_h4 = (arrayOptions = null, parent) => {
    
    let element = document.createElement("h4");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_big_title_h2 = (arrayOptions = null, parent) => {
    
    let element = document.createElement("h2");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_big_title_h1 = (arrayOptions = null, parent) => {
    
    let element = document.createElement("h1");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_label = (arrayOptions = null, parent) => {
    
    let element = document.createElement("label");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_switch = (arrayOptions = null, parent) => {
    
    let element = m_div([{"class": "switch"}], null);
    
    let label = m_label(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_table = (arrayOptions = null, parent) => {
    
    let element = document.createElement("table");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_thead = (arrayOptions = null, parent) => {
    
    let element = document.createElement("thead");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_tbody = (arrayOptions = null, parent) => {
    
    let element = document.createElement("tbody");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_tr = (arrayOptions = null, parent) => {
    
    let element = document.createElement("tr");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_td = (arrayOptions = null, parent) => {
    
    let element = document.createElement("td");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_th = (arrayOptions = null, parent) => {
    
    let element = document.createElement("th");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_icon = (arrayOptions = null, parent) => {
    
    let element = document.createElement("i");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_p = (arrayOptions = null, parent) => {
    
    let element = document.createElement("p");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_select = (arrayOptions = null, parent) => {

    let element = document.createElement("select");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_options = (arrayOptions, parent) => {
    
    let element = document.createElement("option");
    
    element = options([arrayOptions], element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_textarea = (arrayOptions = null, parent) => {
    
    let element = document.createElement("textarea");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_ul = (arrayOptions = null, parent) => {
    
    let element = document.createElement("ul");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_li = (arrayOptions = null, parent) => {
    
    let element = document.createElement("li");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};

m_img = (arrayOptions = null, parent) => {
    
    let element = document.createElement("img");
    
    element = options(arrayOptions, element);
    
    if (parent != null) {
        parent.appendChild(element);   
    }
    
    return element;
};