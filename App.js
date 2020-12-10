import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
//import * as ImagePicker from 'expo-image-picker'
//import * as Permissions from 'expo-permissions'
localStorage.clear();

export default function App() {
  const [categoria, setCategoria] = useState([]);
  const [platillo, setPlatillo] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/categoria")
      .then((res) => res.json())
      .then((datos) => {
        console.log(datos);
        setCategoria(datos);
      })
      .catch((error) => {
        console.log(error);
        alert("Ocurrio un problema con la conexión");
      });
  }, setCategoria);
  
  function PostScreen({ navigation }) {
    const [Nombre, setNombre] = useState("");
    const [Password, setPassword] = useState("");
    function Login() {
      //AGREGO EN BASE DE DATOS
      fetch("http://localhost:3000/user", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nombre: Nombre,
          Password: Password,
        }),
      })
        .then((res) => res.text())
        .then((res) => {
          console.log(res);
          //console.log(typeof(res),res.length);
          if (res.length == 2) {
            alert("Usuario o contraseña no existen");
          } else {
            var a =JSON.parse(res);
            var id =a[0].UsuarioId
            localStorage.setItem('id',id);
            //alert("Te haz logueado exitosamente");
            navigation.navigate("Bienvenidos");
          }
  
          //window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return (
      <View style={estilos.container}>
        <Text style={estilos.texto1}>Login</Text>
        <TextInput
          placeholder="Username"
          onChangeText={(n) => setNombre(n)}
          style={estilos.input}
        ></TextInput>
        <TextInput
          placeholder="Password"
          onChangeText={(a) => setPassword(a)}
          style={estilos.input}
        ></TextInput>
        <TouchableOpacity onPress={() => Login()} style={estilos.button}>
          <Text style={estilos.texto}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  function RegistroScreen() {
    const [Nombre, setNombre] = useState("");
    const [Password, setPassword] = useState("");
    function Registro() {
      //AGREGO EN BASE DE DATOS
      fetch("http://localhost:3000/registro", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nombre: Nombre,
          Password: Password,
        }),
      })
        .then((res) => res.text())
        .then((res) => {
          console.log(res);
          alert("Usuario agregado exitosamente");
          //window.location.reload();
        })
        .catch((error) => console.logl(error));
    }
    return (
      <View style={estilos.container}>
        <Text style={estilos.texto1}>Registro</Text>
        <Text style={estilos.texto1}>
          Unicamente cree su usuario y contraseña
        </Text>
        <TextInput
          placeholder="Username"
          onChangeText={(n) => setNombre(n)}
          style={estilos.input}
        ></TextInput>
        <TextInput
          placeholder="Password"
          onChangeText={(a) => setPassword(a)}
          style={estilos.input}
        ></TextInput>
       <TouchableOpacity onPress={() => Registro()} style={estilos.button}>
          <Text style={estilos.texto}>Crear</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  
  function listado({navigation}) {
 
  function Platillos(plato) {
    navigation.navigate("ListarPlatillos",{plato});
  }
    return (
      <View style={estilos.container}>
        <Text style={estilos.texto1}>Categorias</Text>
        <ScrollView>
          {categoria.map((p) => (
            <TouchableHighlight key={p.CategoriaId} onPress={() => Platillos(p)} style={estilos.cuadro}>
              <View>
                <Text style={estilos.texto}> {p.Nombre}</Text>
                <Text style={estilos.texto}> {p.Fecha}</Text>
                <AntDesign name="right" size={23} color="#0a84ff" />
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    );
  }
  
  function ListadoPlatillos({navigation,route}) {
    console.log(route.params);
    let id=route.params.plato.CategoriaId
    let obj = route.params;
    const [platillo, setPlatillo] = useState([]);
    useEffect(() => {
      fetch("http://localhost:3000/listplatillos/"+id)
        .then((res) => res.json())
        .then((datos) => {
          console.log(datos);
          setPlatillo(datos);
        })
        .catch((error) => {
          console.log(error);
          alert("Ocurrio un problema con la conexión");
        });
    }, setCategoria);
    function AddPlatillos() {
      navigation.navigate("AgregarPlatillos",{obj});
    }
    return (
      <View style={estilos.container}>
        <TouchableOpacity onPress={() => AddPlatillos()} style={estilos.button}>
          <Text style={estilos.texto}>Agregar platillo</Text>
        </TouchableOpacity>
        <Text style={estilos.texto1}>Listado de platillos</Text>
        <ScrollView>
          {platillo.map((p) => (
            <TouchableHighlight key={p.PlatilloId} style={estilos.cuadro}>
              <View>
                <Text style={estilos.texto}>Platillo: {p.Nombre}</Text>
                <Text style={estilos.texto}>Categoria: {p.Categoria}</Text>
                <Text style={estilos.texto}>Descripcion: {p.Descripcion}</Text>
                <Text style={estilos.texto}>Usuario: {p.Usuario}</Text>
                <AntDesign name="right" size={23} color="#0a84ff" />
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    );
  }
  function AgregarPlatillos({navigation,route}) {
    const [Nombre, setNombre] = useState("");
    const [Descripcion, setDescripcion] = useState("");
    //const [Descripcion, setDescripcion] = useState("");
    var cate=route.params.obj.plato.CategoriaId
    function AgregarCat()
    {
      fetch("http://localhost:3000/platillo", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nombre: Nombre,
          CategoriaId:route.params.obj.plato.CategoriaId,
          Descripcion:Descripcion,
          UserId: localStorage.getItem('id')
        }),
      })
        .then((res) => res.text())
        .then((res) => {
          console.log(res);
          alert('Se ha creado un nuevo platillo');
          navigation.navigate("Ver Categorias");
          //window.location.reload();
        })
        .catch((error) => console.log(error));
        //
       
    }
    return (
      <View style={estilos.container}>
        <Text style={estilos.texto1}>Agregar de platillos</Text>
        <TextInput
          placeholder="Nombre del platillo"
          onChangeText={(n) => setNombre(n)}
          style={estilos.input}
        ></TextInput>
                <TextInput
          placeholder="Descripcion"
          onChangeText={(n) => setDescripcion(n)}
          style={estilos.input}
        ></TextInput>
        <TouchableOpacity onPress={() => AgregarCat()} style={estilos.button}>
          <Text style={estilos.texto}>Agregar</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function Categoria() {
    const [Nombre, setNombre] = useState("");
    function AgregarCat()
    {
      fetch("http://localhost:3000/categoriapost", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nombre: Nombre,
        }),
      })
        .then((res) => res.text())
        .then((res) => {
          console.log(res);
          alert('Se ha creado una nueva categoria');
          fetch("http://localhost:3000/categoria")
          .then((res) => res.json())
          .then((datos) => {
            console.log(datos);
            setCategoria(datos);
          })
          .catch((error) => {
            console.log(error);
            alert("Ocurrio un problema con la conexión");
          });
          //window.location.reload();
        })
        .catch((error) => console.log(error));
        //
       
    }
    return (
      <View style={estilos.container}>
        <Text style={estilos.texto1}>
          Nueva categoria
        </Text>
        <TextInput
          placeholder="Nombre de la categoria"
          onChangeText={(n) => setNombre(n)}
          style={estilos.input}
        ></TextInput>
        <TouchableOpacity onPress={() => AgregarCat()} style={estilos.button}>
          <Text style={estilos.texto}>Crear categoria</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function PantallaDos() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Crear Usuario" component={RegistroScreen} />
        <Tab.Screen name="Ver Categorias" component={listado} />
          <Tab.Screen name="Crear Categoria" component={Categoria} />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={PostScreen} />
        <Stack.Screen name="Bienvenidos" component={PantallaDos} />
        <Stack.Screen name="ListarPlatillos" component={ListadoPlatillos} />
        <Stack.Screen name="AgregarPlatillos" component={AgregarPlatillos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#9de1fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto1: {
    fontSize: 30,
    color: "black",
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
  },
  texto: {
    fontSize: 30,
    color: "white",
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "stretch",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    height: 35,
    fontSize: 25,
  },
  button: {
    marginTop:"1%",
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    width: 250,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dcf8c6",
    alignItems:'center',
    justifyContent: 'center',
  },
  cuadro:{
    borderWidth: 10,
    marginBottom: 30,
    width: 300,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
  redondo: {
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 3,
    borderRadius: 35,
    width: 40,
    height: 50,
  },
});
