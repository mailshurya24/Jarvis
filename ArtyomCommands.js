import * as React from 'react';
import {Text, View} from 'react-native';

export default class Commands 
{
    constructor()
    {
        super();
        this._artyom = ArtyomInstance
        this.state =
        {
            weather: ''
        }
    }

    getWeather = async() =>
    {
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139';
    return (fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          weather: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      }));
    }

    searchGoogle = async() =>
    {
        let cx = "111:xxx";
        let googleSearch = document.createElement('script');
        googleSearch.type = "text/javascript";
        googleSearch.async = true;
        googleSearch.src = 'https://cse.google.com/cse.js?cx=' + cx;
        let search = document.getElementsByTagName('script')[0];
        search.parentNode.insertBefore(googleSearch, search);

        <div class = "searchbox" data-resultsUrl="http://www.example.com"
        data-newWindow="true" data-queryParameterName="search"></div>
    }

    loadCommands = () =>
    {
        let Artyom = this._artyom;

        return(
            Artyom.addCommands([
            {
                indexes: ["Hello", "Hi", "Hey"],
                action: () => {
                    Artyom.say("Hello, how are you?")
                }
            },

            {
                indexes: [/How are you/, /Regular expressions supported/],
                action: () => {
                    Artyom.say("I'm fine, thank you for asking!")
                }
            },

            {
                indexes: ["Generate reports of" * "of this year"],
                smart: true,
                action: (index, month) => {
                    let year = new Date().getFullYear();
                    Artyom.say("Generating reports of ${month} ${year}")
                }
            },

            {
                indexes: ["How is the weather", "What's the weather", "How's the weather going to be"],
                action: () => {
                    Artyom.say("Here you go...");
                    this.getWeather();
                    <Text>{this.state.weather}</Text>
                }
            },

            {
                
            }
            ])
        )
    }
}