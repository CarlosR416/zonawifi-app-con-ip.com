function Button(props){
    return (
        <button 
            onClick={props.onClick} 
            type="button" 
            className="option_btn btn btn-primary btn-sm" 
            data-i={props.active} 
            id="btn_nuevo_registro"
        >
        {props.text}
        </button>
    );
}

class BaseButton extends React.Component{
    constructor(props){
    super(props);
    let text = "NaN";
    let level = 0;
    }

    getText(){

        let text = this.text;

        if(typeof(this.props.text) != "undefined"){
            text = this.props.text;
        }

        return text;
    }

    getLevel(){

        let level = this.level;

        if(typeof(this.props.level) != "undefined"){
            level = this.props.level;
        }

        return level;
    }
}

class ButtonCreate extends BaseButton{

    constructor(props){
        super(props);
        
        this.text = "Nuevo Registro";
        this.AjaxSuccess = this.AjaxSuccess.bind(this);
        this.AjaxError = this.AjaxError.bind(this);
    }


    AjaxSuccess(){
        alerta("Genial");
    }

    AjaxError(){

    }

    click(){
        
        let buffer = this.props.fields;
        
        if(this.props.fields.id !== undefined){
            let celda = CeldasCheck();

            buffer.id = celda.id[0];
        }

        ReactDOM.render(
                <Modal
                    title={this.props.title}
                    button1={this.props.button1}
                    fields={buffer}
                    funcion={this.props.funcion}
                    url={this.props.url}
                    BodyContent={(changeState, CamposForm) => this.props.formTemplate(changeState, CamposForm)}
                />,
                document.getElementById('carga_modal'),
                () => cobrar()
            );  

    }


    render(){
        return(    
            <Button 
                onClick={() => this.click()}
                text={this.getText()}
                active={this.getLevel()}
            />
        );
    }
}

class ButtonEdit extends BaseButton {

    constructor(props){
        super(props);

        this.text = "Editar Registro";
        this.AjaxSuccess = this.AjaxSuccess.bind(this);
        this.AjaxError = this.AjaxError.bind(this);
    }

    AjaxSuccess(){
        alerta("Genial");
    }

    AjaxError(){

    }

    click(){

        let url = this.props.url.get;

        let param = new FormData();

        let celda = CeldasCheck();
        param.append("funcion", this.props.funcion);
        param.append("data[gastos]", celda.id);

        fetch(url, {
            method: "POST",
            body: param
        })
        .then(res => res.json())
        .then(
                (result) => {
                
                    if(!validar(result)){
                        return 0;
                    }

                    let defaultdata = this.props.fields;

                    for (const property in defaultdata) {
                        if(result[0][property] == null | result[0][property] == undefined){
                            defaultdata[property] = " ";
                        }else{
                            defaultdata[property] = result[0][property];
                        }
                    }

                    ReactDOM.render(
                        <Modal
                            title={this.props.title}
                            button1={this.props.button1}
                            fields={defaultdata}
                            funcion={this.props.funcion}
                            url={this.props.url}
                            BodyContent={(changeState, CamposForm) => this.props.formTemplate(changeState, CamposForm)}
                        />,
                        document.getElementById('carga_modal'),
                        () => cobrar()
                    );
                            
                },
            
                (error) => {
                    console.error("Error al obtener gasto"+error);
                }
        )

    }


    render(){
        return(
            <Button 
                onClick={() => this.click()}
                text={this.getText()}
                active={this.getLevel()}
            />
        );
    }
}

class ButtonDelete extends BaseButton {

    constructor(props){
        super(props);

        this.text = "Eliminar Registro";

    }

    click(){
        //validar({error: "Indefinido"});

        
    }

    render(){
        return(
            <Button 
                onClick={() => this.click()}
                text={this.getText()}
                active={this.getLevel()}
            />
        );
    }
}

class ButtonProcess extends BaseButton {

    constructor(props){
        super(props);

        this.text = "Procesar Registro";

    }

    click(){
        let url = "{{base_dir_controller}}data/obtener/gastos";

        let param = new FormData();

        let celda = CeldasCheck();
        param.append("funcion", "obtener_gasto");
        param.append("data[gastos]", celda.id);

        fetch(url, {
            method: "POST",
            body: param
        })
        .then(res => res.json())
        .then(
                (result) => {
                
                if(!validar(result)){
                    return 0;
                }

                ReactDOM.render(
                    <ContentModal 
                        title="Procesar Gasto"
                        button1="Procesar"
                        content="procesargasto"
                        dataDefault={result[0]} 
                    />,
                    document.getElementById('carga_modal'),
                    () => cobrar()
                );    
                    
                },
            
                (error) => {
                    
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
        )
        
    }

    render(){
        return(    
            <Button 
                onClick={() => this.click()}
                text={this.getText()}
                active={2}
            />
        );
    }
}