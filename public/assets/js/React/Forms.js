class Formdata extends React.Component{
        
    constructor(props) {
        super(props);
        
        this.onChange2 = this.onChange2.bind(this);

    }
    
    /*componentDidUpdate(prevProps) {
        
        if (this.props.idGet !== prevProps.idGet) {

            let buffer = this.props.dataDefault;
        
            for (const property in buffer) {
                
                if(buffer[property] == null | buffer[property] == undefined){
                    
                    buffer[property] = " ";
                
                }
                

            } 
            
            this.props.changeState("put", {InputsData: buffer});
        }

    }*/

    /*componentDidMount(){
        let buffer = this.props.dataDefault;
        
            for (const property in buffer) {
                
                if(buffer[property] == null | buffer[property] == undefined){
                    
                    buffer[property] = " ";
                
                }
                

            } 
         
        this.props.changeState("put", {CamposForm: buffer});
    }*/

    onChange2(event){

       let value = event.target.value;
       let name = event.target.name;
       let buffer = this.props.changeState("get");
       
       buffer.fields[name] = value;

       this.props.changeState("put", buffer);
    }
  
}


/************************************************************/    
class CamposForm extends React.Component{
    
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }
   

    onChange(event = false){
        
        if(event){

            this.props.onChange(event);
            
        }

    }

    
}
/*----------------------------------------------------------*/

class InputFecha extends CamposForm{ 

    render(){

        return(
            <input 
                className="date-picker form-control" 
                placeholder="dd/mm/aaaa" 
                type="date"
                required="required"
                value={this.props.defaultValue} 
                name={this.props.name} 
                onChange={this.onChange}
            />
        );  
    }
                 
}

class InputData extends CamposForm{

    constructor(props) {
        super(props);
        this.state = {
        error: null,
        isLoaded: false,
        items: [],
        selected: false
        };

        this.OnSelect = this.OnSelect.bind(this);

    }

    componentDidMount() {
        this.onChange();
        let url = null;
        switch (this.props.data) {
            case "meses":
                
                url = "{{base_dir_controller}}data/obtener/meses?funcion=obtener_meses&data=";
                
                break;

            case "cuentas":

                url = "{{base_dir_controller}}data/obtener/cuentas?funcion=obtener_cuentas&data=";
                
                break; 

            default:

                this.setState({
                            isLoaded: true,
                            error: {
                                message: "url no definida"
                            },
                        });

                break;  
        }

        if(url){

            fetch(url)
            .then(res => res.json())
            .then(
                (result) => {

                    if(result[0].error){

                        this.setState({
                            isLoaded: true,
                            error: {
                                message: result[0].error
                            },
                        });

                    }else{
                        this.setState({
                            isLoaded: true,
                            items: result
                        });
                    }
                    
                },
            
                (error) => {
                    
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

        }
    }

    OnSelect(event){
        if(event){
            
            this.setState({selected: true});
            this.onChange(event);
        }
    }
    
    render(){
        const { error, isLoaded, items } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return(
                
                <select 
                    className="form-control" 
                    name={this.props.name}
                    value={this.props.defaultValue} 
                    onChange={this.OnSelect}
                > 
                <option value="0" disabled={this.state.selected} >Seleccione...</option>
                {items.map(item => (
                    <option value={item.id} key={item.id} >{item.nombre}</option>
                ))} 
                                  
                </select>                    
            ); 
        }
    }
     
}

class InputText extends CamposForm{
    

    render(){

        return(
            <input 
                type="text" 
                className="form-control"
                value={this.props.value} 
                name={this.props.name}  
                placeholder={this.props.placeholder}
                onChange={this.onChange}
            />
               
        );
    }
      
}

class InputValue extends CamposForm{
    
    render(){
        return(
            <input 
                type="text" 
                className="form-control" 
                name={this.props.name}
                value={this.props.defaultValue} 
                placeholder={this.props.placeholder} 
                onChange={this.onChange}
            />
               
        );
    }
      
}

class InputTextarea extends CamposForm{
    
    render(){
        return(
            <input 
                type="text" 
                className="form-control" 
                name={this.props.name}  
                placeholder={this.props.placeholder} 
                onChange={this.onChange}
                value={this.props.defaultValue} 
            />
               
        );
    }
      
}

/*************************************************************/



class Form extends React.Component{
    constructor(props) {
        super(props);

        let dataform = {
                        url: "{{base_dir_controller}}data/agregar/gastos",
                        funcion: "crear_gasto",
                        resp: (resp) => this.resp(resp)
                    };

        props.changeState(dataform);
    }

    resp(resp){
        validar(resp);
            
        let fila = addRow(resp, index_tb);
        
        fila[0][0] = '<input type="checkbox" name="check-all" onclick="this.checked = !this.checked" value="'+resp[0].id+'">'
        

        table.row.add(fila[0]).draw().nodes().to$().addClass( 'id_'+resp[0].id );

        new PNotify({
                title: 'Registro Creado',
                text: 'Los registros han sido creados correctamente',
                type: 'success',
                styling: 'bootstrap3'
            });

        $(".bs-example-modal-lg").modal("hide");
    }

    render(){
        return(
            <form className="form-label-left input_mask" id="modal_form_cobrar">
                <div className="col-md-6 col-sm-6 has-feedback">
                    <div className="form-group row">
                        <label className="col-form-label col-md-3 col-sm-3 ">Descripcion: </label>
                        <div className="col-md-9 col-sm-9 ">
                            <InputText
                                name="descripcion"
                                valueDefault="90000"
                                placeholder="Ingrese descripcion" 
                                onChange={this.props.onChange2}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 has-feedback">
                    <div className="form-group row">
                        <label className="col-form-label col-md-3 col-sm-3 ">Monto: </label>
                        <div className="col-md-9 col-sm-9 ">
                            <InputValue 
                                name="valor"
                                valueDefault="90000"
                                placeholder="Monto"  
                                onChange={this.props.onChange2}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 has-feedback">
                    <div className="form-group row">
                        <label className="col-form-label col-md-4 col-sm-4 ">Afiliar a Mes<span className="required">*</span>
                        </label>
                        <div className="col-md-8 col-sm-8 ">
                            <InputData
                                data="meses"
                                name="id_mes"
                                valueDefault=""
                                onChange={this.props.onChange2}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 has-feedback">
                    <div className="form-group row">
                        <label className="col-form-label col-md-4 col-sm-4 ">Fecha del Gasto<span className="required">*</span>
                        </label>
                        <div className="col-md-8 col-sm-8 ">
                            <InputFecha 
                                name="fecha"
                                valueDefault=""
                                onChange={this.props.onChange2}/>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
    
}

class Form3 extends React.Component{
    
    constructor(props) {
        super(props);
        
        let dataform = {
                        url: "{{base_dir_controller}}data/modificar/gastos",
                        funcion: "modificar_gasto",
                        resp: (resp) => this.resp(resp)
                    };

        props.changeState(dataform);

    }

    resp(resp){
        validar(resp);
            
        let fila = addRow(resp, index_tb);
        
        fila[0][0] = '<input type="checkbox" name="check-all" onclick="this.checked = !this.checked" value="'+resp[0].id+'">'
        

        table.row.add(fila[0]).draw().nodes().to$().addClass( 'id_'+resp[0].id );

        new PNotify({
                title: 'Registro Creado',
                text: 'Los registros han sido creados correctamente',
                type: 'success',
                styling: 'bootstrap3'
            });

        $(".bs-example-modal-lg").modal("hide");
    }

    
    render(){

        return(
             <form className="form-label-left input_mask" id="modal_form_cobrar">
                <div className="col-md-6 col-sm-6 has-feedback">
                    <div className="form-group row">
                        <label className="col-form-label col-md-3 col-sm-3 ">Descripcion: </label>
                        <div className="col-md-9 col-sm-9 ">
                            <InputText
                                name="descripcion"
                                defaultValue={this.props.data.descripcion}
                                placeholder="Ingrese descripcion" 
                                onChange={this.props.onChange2}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 has-feedback">
                    <div className="form-group row">
                        <label className="col-form-label col-md-3 col-sm-3 ">Monto: </label>
                        <div className="col-md-9 col-sm-9 ">
                            <InputValue 
                                name="valor"
                                defaultValue={this.props.data.valor}
                                placeholder="Monto"  
                                onChange={this.props.onChange2}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 has-feedback">
                    <div className="form-group row">
                        <label className="col-form-label col-md-4 col-sm-4 ">Afiliar a Mes<span className="required">*</span>
                        </label>
                        <div className="col-md-8 col-sm-8 ">
                            <InputData
                                data="meses"
                                name="id_mes"
                                defaultValue={this.props.data.id_mes}
                                onChange={this.props.onChange2}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 has-feedback">
                    <div className="form-group row">
                        <label className="col-form-label col-md-4 col-sm-4 ">Fecha del Gasto<span className="required">*</span>
                        </label>
                        <div className="col-md-8 col-sm-8 ">
                            <InputFecha 
                                name="fecha"
                                defaultValue={this.props.data.fecha}
                                onChange={this.props.onChange2}/>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
    
}

class Form2 extends React.Component{
    
    constructor(props) {
        super(props);
        
        let dataform = {
                        url: "{{base_dir_controller}}data/modificar/gastos",
                        funcion: "crear_gasto",
                        resp: (resp) => this.resp(resp)
                    };

        props.changeState(dataform);
    }

    resp(resp){
        validar(resp);
            
        let fila = addRow(resp, index_tb);
        
        fila[0][0] = '<input type="checkbox" name="check-all" onclick="this.checked = !this.checked" value="'+resp[0].id+'">'
        

        table.row.add(fila[0]).draw().nodes().to$().addClass( 'id_'+resp[0].id );

        new PNotify({
                title: 'Registro Creado',
                text: 'Los registros han sido creados correctamente',
                type: 'success',
                styling: 'bootstrap3'
            });

        $(".bs-example-modal-lg").modal("hide");
    }

    render(){

        return(
            <form className="form-label-left input_mask" id="modal_form_cobrar">
                <div className="col-md-6 col-sm-6 has-feedback">
                    <div className="form-group row">
                        <label className="col-form-label col-md-3 col-sm-3 ">Mes: </label>
                        <div className="col-md-9 col-sm-9 ">
                            <InputData 
                                data="cuentas" 
                                name="cuenta"
                                valueDefault=""
                                onChange={this.props.onChange2}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 has-feedback">
                    <div className="form-group row">
                        <label className="col-form-label col-md-3 col-sm-3 ">Mes: </label>
                        <div className="col-md-9 col-sm-9 ">
                            <InputText
                                name="mes"
                                placeholder="Ingrese datos"
                                valueDefault={this.props.dataDefault.gasto}
                                onChange={this.props.onChange2}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 has-feedback">
                    <div className="form-group row">
                        <label className="col-form-label col-md-3 col-sm-3 ">Mes: </label>
                        <div className="col-md-9 col-sm-9 ">
                            <InputData 
                                data="meses"
                                name="mes"
                                valueDefault="" 
                                onChange={this.props.onChange2}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 has-feedback">
                    <div className="form-group row">
                        <label className="col-form-label col-md-4 col-sm-4 ">Fecha del Gasto<span className="required">*</span>
                        </label>
                        <div className="col-md-8 col-sm-8 ">
                            <InputFecha 
                                name="fecha"
                                valueDefault=""
                                onChange={this.props.onChange2}/>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
    
}