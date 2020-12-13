import React from 'react';
import {
    Animated,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//Constants

import { images, theme } from '../../constants';
const { onboarding1, onboarding2, onboarding3, logo } = images;
const { COLORS, FONTS, SIZES } = theme;


const onboardings = [
    {
        title: "Time to take control over your fridge",
        img: onboarding1,
        test: '72.1%'
    },
    {
        title: "Track your food waste.",
        img: onboarding2,
        test: '72.1%'
    },
    {
        title: "Know when your ingredients expire.",
        img: onboarding3,
        test: '72.1%'
    }
];


const Onboarding = () => {

    const [completed, setCompleted] = React.useState(false);

    const scrollX = new Animated.Value(0);

    React.useEffect(() => {
        // checks if user has finished scrolling on the onboarding pages
        scrollX.addListener(({ value }) => {
            if (Math.floor(value / SIZES.width) === onboardings.length - 2) {
                setCompleted(true);

            }
        });

        return () => scrollX.removeListener();
    }, []);


    function renderContent() {
        return (
            <LinearGradient
                colors={[COLORS.white, COLORS.peach]}
                start={{ x: 0.5, y: 0.7 }}

            >
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    decelerationRate={0}
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX } } },
                    ], { useNativeDriver: false })}

                >


                    {onboardings.map((item, index) => (

                        <View
                            key={index}
                            style={{ width: SIZES.width }}
                        >



                            <View
                                style={{
                                    position: 'absolute',
                                }}
                            >
                                <Image
                                    source={logo}
                                    resizeMode="cover"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        margin: 20,
                                    }}


                                />
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', paddingTop: "70%" }}>
                                <Image

                                    source={item.img}
                                    resizeMode="cover"
                                // style={{
                                //     width: "80%",
                                //     height: "80%",
                                // }}

                                />
                            </View>

                            <View style={{
                                position: 'absolute',
                                top: '10%',
                                left: 40,
                                right: 40
                            }}>
                                <Text style={{
                                    ...FONTS.h1,
                                    color: COLORS.grey,
                                    textAlign: 'left',
                                    width: '80%',
                                    paddingTop: 30,
                                }}
                                >
                                    {item.title}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    color: COLORS.grey,
                                    padding: 20


                                }}
                                onPress={() => console.log("Pressed")}

                            >
                                <Text style={{ ...FONTS.h4, color: COLORS.grey, textTransform: 'uppercase' }} >{completed ? " " : "Skip"}</Text>
                            </TouchableOpacity>
                        </View>


                    ))}

                </Animated.ScrollView>
            </LinearGradient>
        );
    }

    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width)

        return (
            <View style={styles.dotsContainer}>
                {onboardings.map((item, index) => {

                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"

                    })


                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={[styles.dot, { width: 8, height: 8 }]}

                        >

                        </Animated.View>

                    )

                })}
            </View>

        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderContent()}
            </View>

            <View style={styles.dotsRootContainer}>
                {renderDots()}
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    dotsRootContainer: {
        position: 'absolute',
        bottom: '0%',
    },

    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.padding / 2,
        marginBottom: SIZES.padding,
        height: SIZES.padding,
    },
    dot: {
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.grey,
        marginHorizontal: SIZES.radius / 2
    }

})
export default Onboarding; 