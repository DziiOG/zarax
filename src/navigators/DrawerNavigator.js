import React, { Fragment } from 'react';
import {connect} from 'react-redux';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import jwtDecode from 'jwt-decode';
import {View, StyleSheet,Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Avatar,
    
    Drawer,
    
    TouchableRipple,
    Switch
} from 'react-native-paper';

import {Text, Icon as MyIcon} from 'native-base'

import { NavigationContainer } from '@react-navigation/native';
import LottieView from 'lottie-react-native';



import { createStackNavigator } from '@react-navigation/stack';
import RootStackScreen from './RootStackNavigator';

import { signUserOut as signOut } from '../routes/SignIn/modules/signinscreen';
import { getScreams } from '../routes/Home/modules/home'
import HomeContainer from '../routes/Home/containers/HomeContainer';
import { ProductConsumer, ProductProvider } from '../context';
import ProfileContainer from '../routes/Profile/containers/ProfileContainer';
import NotificationsContainer from '../routes/Notifications/containers/NotificationsContainer';
import ZaraxComponentContainer from '../routes/ZaraxDialog/containers/ZaraxComponentContainer';
import UserProfileContainer from '../routes/UserProfile/containers/UserProfileContainer';


const ZaraxDialogStack = createStackNavigator();
const UserProfileStack = createStackNavigator();

const Stack = createStackNavigator();

const ProfileStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const Drawers = createDrawerNavigator();
//const Tab = createBottomTabNavigator();

const MainBottomTab = createBottomTabNavigator();

const mapStateToProps = state => ({
    token: state.signin.userToken ,
    userData: state.signin.userData || {},
    loading: state.home.loading,
    welcome: state.signin.welcome
    
});

const mapActionsCreators = {
  signOut,
  getScreams
};


const checkAuth = (token) => {

  if(token){
    const decodedToken = jwtDecode(token);
    if(decodedToken.exp * 1000 < Date.now()){
      return false;
      
    }else {
      return true
    }
  }else {
    return false
  }
}









function MyDrawer({navigation, token, signOut,  userData, welcome }) {
  console.log(checkAuth(token))
  return (
   <Fragment>
      {
        (checkAuth(token)) ?
        userData && welcome ?
        <ProductProvider>
          <NavigationContainer >
            <Drawers.Navigator  initialRouteName="Home"    drawerContent={(props)=> <CustomDrawerContent {...props} signOut={signOut} userData={userData}></CustomDrawerContent>}>
              <Drawers.Screen name="Home"  component={MainTab} />
              <Drawers.Screen name="Profile"  component={ProfileStackScreen} />
              <Drawers.Screen name="Zarax"  component={ZaraxDialogStackScreen} />
              <Drawers.Screen name="User"  component={UserProfileStackScreen} />
            </Drawers.Navigator>
          </NavigationContainer>        
        </ProductProvider> :
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          width: '100%',
          flexDirection: 'column'
      }}>
          <LottieView source={require('../assets/still.json')} autoPlay loop />
          <Text>Please Wait while we fetch your details...</Text>
      </View>
        : 
        <NavigationContainer>
        <RootStackScreen></RootStackScreen>
        </NavigationContainer>
            
      }
   </Fragment>
          

  );
}



 
       
function MainTab({navigation}){
  return (
    <MainBottomTab.Navigator >
        <MainBottomTab.Screen
                name="Home1"
                component={HomeStackScreen}
                options={({route})=>({
                    tabBarLabel: '',
                  
                    tabBarIcon: ({ color, size, focused }) => {
                      let iconName = focused;

                      if(route.name === 'Home' || "Home1"){
                        iconName = focused ? 'home' :'home-outline'
                      }else if (route.name === "Notification"){
                        iconName = focused ? 'bell' : "bell-outline"
                      }

                      return <MaterialCommunityIcons name={iconName}  color={color} size={size} />
                    },
                })}
                />
      
         <MainBottomTab.Screen
                name="Notification"
                component={NotificationStackScreen}
                options={({route})=>({
                  tabBarLabel: '',
                
                  tabBarIcon: ({ color, size, focused }) => {
                    let iconName = focused;

                    if (route.name === "Notification"){
                      iconName = focused ? 'bell' : "bell-outline"
                    }
                    //console.log(route.name)

                    return <MaterialCommunityIcons name={iconName}  color={color} size={size} />
                  },
              })}
                 
                />
    </MainBottomTab.Navigator>
  )
}



function ZaraxDialogStackScreen({navigation}){
  return(
    <ProductConsumer>
      {
        (value)=>(

          <ZaraxDialogStack.Navigator  screenOptions={{
            headerTitle: "Zarax",
            headerTitleAlign: 'center',

            headerTitleStyle: {fontSize: 18, justifyContent: 'center', alignItems: 'center', },
            
            headerLeft: ((props)=> (  
                          <TouchableOpacity
                          onPress={()=>{
                            navigation.goBack();
                            
                          }}
                          style={{
                            height: 50,
                            width:50,
                            justifyContent: "center",
                            alignItems: 'center'
                          }}
                          >
                                  <MyIcon 
                                  name="ios-arrow-back"
                                  style={{
                                    color: "#000"
                                  }}
                                  size={30}
                                  >

                                  </MyIcon>
                          </TouchableOpacity>
                                  )),
            headerLeftContainerStyle: {marginLeft: 15, marginTop: 0 },
            headerStyle: {
              height: 50
            }
          }}>
          
            <ZaraxDialogStack.Screen name="ZaraxDialog"  component={ZaraxComponentContainer} />
          </ZaraxDialogStack.Navigator>
        )
      }
    </ProductConsumer>
   )
  
}

function HomeStackScreen({navigation}) {
  return (
    <ProductConsumer>
      {
        (value)=>(
         
        <Stack.Navigator  screenOptions={{
          headerTitle: ((props)=> ( 
          <View style={{
            width: 50, height: 50
          }}>
              <LottieView source={require('../assets/calm.json')} autoPlay loop />
          </View> 
          
          
          )),
          headerTitleAlign: 'center',

          headerTitleStyle: {fontSize: 40, justifyContent: 'center', alignItems: 'center'},
          
          headerLeft: ((props)=> (  
                        <TouchableOpacity
                        onPress={()=>{
                          navigation.openDrawer();
                        }}
                        >
                                <Avatar.Image source={{
                                    uri: value.imageUrl 
                                }}
                                size={30}
                                >

                                </Avatar.Image>
                        </TouchableOpacity>
                                )),
          headerLeftContainerStyle: {marginLeft: 15, marginTop: 0 },
          headerStyle: {
            height: 50
          }
        }}>
        
          <Stack.Screen name="HomeComponent"  component={HomeContainer} />
         
        </Stack.Navigator>
        )
      }
    </ProductConsumer>
  );
}


function NotificationStackScreen({navigation}) {
  return (
    <ProductConsumer>
      {
        (value)=>(
         
        <NotificationStack.Navigator  screenOptions={{
          headerTitle: "Notifocation",
          headerTitleAlign: 'center',

          headerTitleStyle: {fontSize: 18, justifyContent: 'center', alignItems: 'center'},
          
          headerLeft: ((props)=> (  
                        <TouchableOpacity
                        onPress={()=>{
                          navigation.openDrawer();
                        }}
                       
                        >
                                <Avatar.Image source={{
                                    uri: value.imageUrl 
                                }}
                                size={30}
                                >

                                </Avatar.Image>
                        </TouchableOpacity>
                                )),
          headerLeftContainerStyle: {marginLeft: 15, marginTop: 0 },
          headerStyle: {
            height: 50
          }
        }}>
        
          <NotificationStack.Screen name="NotificationsComponent"  component={NotificationsContainer} />
        </NotificationStack.Navigator>
        )
      }
    </ProductConsumer>
  );
}

function ProfileStackScreen({navigation}){
  return(

 <ProductConsumer>
   {
     (value)=> (
      <ProfileStack.Navigator  screenOptions={{
        headerTitle: "Profile",
        headerTitleAlign: 'center',

        headerTitleStyle: {fontSize: 18, justifyContent: 'center', alignItems: 'center', },
        
        headerLeft: ((props)=> (  
                      <TouchableOpacity
                      onPress={()=>{
                        navigation.goBack();
                        
                      }}
                      style={{
                        height: 50,
                        width:50,
                        justifyContent: "center",
                        alignItems: 'center'
                      }}
                      >
                              <MyIcon 
                              name="ios-arrow-back"
                              style={{
                                color: "#000"
                              }}
                              size={30}
                              >

                              </MyIcon>
                      </TouchableOpacity>
                              )),
        headerLeftContainerStyle: {marginLeft: 15, marginTop: 0 },
        headerStyle: {
          height: 50
        }
      }}>
      
        <ProfileStack.Screen name="ProfileComponent"  component={ProfileContainer} />
      </ProfileStack.Navigator>
     )
   }
 </ProductConsumer>
  )
}

function UserProfileStackScreen({navigation}){
  return(

 <ProductConsumer>
   {
     (value)=> (
      <UserProfileStack.Navigator  screenOptions={{
        headerTitle: "Profile",
        headerTitleAlign: 'center',

        headerTitleStyle: {fontSize: 18, justifyContent: 'center', alignItems: 'center', },
        
        headerLeft: ((props)=> (  
                      <TouchableOpacity
                      onPress={()=>{
                        navigation.goBack();
                      
                      }}
                      style={{
                        height: 50,
                        width:50,
                        justifyContent: "center",
                        alignItems: 'center'
                      }}
                      >
                              <MyIcon 
                              name="ios-arrow-back"
                              style={{
                                color: "#000"
                              }}
                              size={30}
                              >

                              </MyIcon>
                      </TouchableOpacity>
                              )),
        headerLeftContainerStyle: {marginLeft: 15, marginTop: 0 },
        headerStyle: {
          height: 50
        }
      }}>
      
        <UserProfileStack.Screen name="UserProfileComponent"  component={UserProfileContainer} />
      </UserProfileStack.Navigator>
     )
   }
 </ProductConsumer>
  )
}





function CustomDrawerContent(props) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);  
      const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
}

  return (
    
    <ProductConsumer>
      {
        (value) => (

          <View style={{flex:1}}>
                  <DrawerContentScrollView {...props}>
                      <View style={styles.drawerContent}>
                          <View style={styles.userInfoSection}>
                              <View style={{flexDirection: 'row', marginTop: 15}}>
                                  <Avatar.Image source={{
                                      uri: value.imageUrl 
                                  }}
                                  size={50}
                                  >
      
                                  </Avatar.Image>
                                  <View style={{marginLeft: 15, marginBottom: 35, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
                                      <Text  style={styles.title}>{value.email}</Text>
                                      <Text  style={styles.caption}>{value.handle}</Text>
                      
                                  </View>
                              </View>
      
                              
                          </View> 
                          <Drawer.Section style={styles.drawerContent}>
                              <DrawerItem icon={({size}) => (
                                      <Icon
                                          name="home-outline"
                                          color="#d2d2d2"
                                          size={size}
                                          >
      
                                      </Icon>
                                      
                                      )} 
                                      label="Home"
                                      
                                      onPress={()=> {props.navigation.navigate('Home')}}
                                      >
                              </DrawerItem>

                              <DrawerItem icon={({size}) => (
                                      <Icon
                                          name="account"
                                          color="#d2d2d2"
                                          size={size}
                                          >
      
                                      </Icon>
                                      
                                      )} 
                                      label="Profile"
                                      
                                      onPress={()=> {props.navigation.navigate('Profile')}}
                                      >
                              </DrawerItem>

                              
                             
                          </Drawer.Section>
                          <Drawer.Section title="Preferences">
                                  <TouchableRipple onPress={() => {toggleTheme()}}>
                                      <View style={styles.preference}>
                                          <Text>Dark Theme</Text>
                                          <View pointerEvents="none">
                                              <Switch value={isDarkTheme}></Switch>
                                          </View>
                                      </View>
                                  </TouchableRipple>
                          </Drawer.Section>
      
                      </View>
                  </DrawerContentScrollView>
                  <Drawer.Section style={styles.bottomDrawerSection}>
                      <DrawerItem icon={({color, size}) => (
                          <Icon
                          name="exit-to-app"
                          color="#d2d2d2"
                          size={size}
                          >
      
      
                          </Icon>
                      )} label="Sign Out"
                      onPress={()=> { 
                        props.signOut();
                       
                       }}
                      >
      
                      </DrawerItem>
                  </Drawer.Section>
              </View>
              
        )
      }
    </ProductConsumer>
      

     
  );
}

/*

function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor="#e91e63"
        style={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Measurements"
          component={Measurements}
          options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    )
  };

*/







const styles = StyleSheet.create({
  drawerContent: {
      flex: 1,
  },
  userInfoSection: {
      paddingLeft: 20,
  },
  title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
  },
  caption: {
      fontSize: 14,
      lineHeight: 14,
      justifyContent: 'flex-start',
      padding: 12
  },
  row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
  },
  section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
  },
  paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
  },
  drawerSection: {
      marginTop: 15,
  },
  bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1
  },
  preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 15,
  }
})




export default connect(mapStateToProps, mapActionsCreators)(MyDrawer);