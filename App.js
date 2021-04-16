import * as React from 'react';
import {Text, View, TouchableOpacity, KeyboardAvoidingView, Card} from 'react-native';
import {Input} from 'react-native-elements';
import * as Artyom from 'artyom.js';
import Commands from './ArtyomCommands';
import AppHeader from './AppHeader';

const Jarvis = new Artyom();

export default class App extends React.Component 
{
    constructor(props, context)
    {
        super(props, context);
        this.startAssistant = this.startAssistant.bind(this);
        this.stopAssistant = this.stopAssistant.bind(this);
        this.speakText = this.speakText.bind(this);
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);

        this.state = 
        {
            artyomActive: false,
            textAreaChange: '',
            artyomIsReading: false
        }

        let CommandsManager = new Commands(Jarvis);
        Commands.loadCommands();
    }

    startAssistant = () =>
    {
        let _this = this;

        
        Jarvis.initialize({
            lang: 'en-GB',
            debug: true,
            continuous: true,
            soundex: true,
            listen: true
        })
        .then(()=>{
            console.log(Jarvis.getAvailableCommands());

            Jarvis.say("Hello there, how are you");
            this.setState({artyomActive: true});
        })
        .catch((error)=>{
            let message = error.message;
            console.error("Oops...Something went wrong!", message);
        })

        console.log("Jarvis-Successfully-Launched");
    }

    stopAssistant = () =>
    {
        let _this = this;

        Jarvis.fatality()
        .then(()=>{
            console.log("Jarvis has been successfully stopped");

            this.setState({artyomActive: false});
        })
        .catch((error)=>{
            let message = error.message;
            console.error("Oops...Something went wrong!", message);
            this.setState({artyomActive: false});
        })

        console.log("Jarvis-Successfully-Stopped");
    }

    speakText = () =>
    {
        this.setState({artyomIsReading:true});

        Jarvis.say(this.state.textAreaChange,
        {
            onEnd = () => {
                this.setState({artyomIsReading: false});
            }
        })
    }

    handleTextAreaChange = (event) => 
    {
        this.setState({textAreaChange: event.target.value});
    }

    render()
    {
        return(
            <View>
              <KeyboardAvoidingView>
                <View>
                  <AppHeader title = "Jarvis" color = "#66C1B3"/>
                </View>

                <View>
                  <Card>
                    <Text>Welcome to Jarvis Assistant!</Text>
                    <Text>
                      In this very basic assistant, you can say hello to Jarvis and ask for some reports e.g `Generate report of April of this year`
                    </Text>
                    <Text>It is still in BETA phase, so your feedback will be immensely helpful!</Text>
                  </Card>
                </View>

                <View>
                  <input 
                    type = "button"
                    value = "Start Jarvis" 
                    disabled = {this.state.artyomActive}
                    onClick = {this.startAssistant()}
                  />

                  <input 
                    type = "button"
                    value = "Stop Jarvis" 
                    disabled = {this.state.artyomActive}
                    onClick = {this.stopAssistant()}
                  />
                </View>

                <View>
                  <Text>Jarvis can read some text for you if you want!</Text>
                  <Text>Type whatever you want Jarvis to read for you in the input boxes below!</Text>
                </View>

                <View>
                  <textarea 
                    rows = "8" 
                    onChange = {this.handleTextAreaChange()}
                    value = {this.state.textAreaChange}
                  />
                </View>

                <View>
                  <input
                    type = "button"
                    value = "Jarvis, read!"
                    disabled = {this.state.artyomIsReading}
                    onClick = {this.speakText()}
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
        )
    }
}