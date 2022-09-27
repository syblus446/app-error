import React, { useRef } from 'react'
import {
    View,
    Text,
    Image,
    Animated,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import {
    Home,
    Profile,
    Search
} from '../../screens';
import { COLORS, FONTS, SIZES, constants } from '../../constants';
import { Shadow } from 'react-native-shadow-2';


const bottom_tabs = constants.bottom_tabs.map((bottom_tabs) => ({
    ...bottom_tabs,
    ref: React.createRef()
}))

const Tabs = ({ scrollX }) => {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row'
            }}
        >

            {/* Tabs */}
            {bottom_tabs.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={`BottomTab-${index}`}
                        ref={item.ref}
                        style={{
                            flex: 1,
                            paddingHorizontal: 15,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    // Onpress
                    >
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />

                        <Text
                            style={{
                                marginTop: 3,
                                color: COLORS.white,
                                ...FONTS.h3
                            }}>
                            {item.label}
                        </Text>

                    </TouchableOpacity>
                )
    
            })}
        </View>
    )
}
const MainLayout = () => {

    const flatListRef = React.useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current;


    function renderContent() {
        return (
            <View style={{
                flex: 1,

            }}
            >
                <Animated.FlatList
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={SIZES.width}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    data={constants.bottom_tabs}
                    keyExtractor={item => `Main-${item.id}`}
                    onScroll={
                        Animated.event([
                            { nativeEvent: { contentOffset: { x: scrollX } } }
                        ], {
                            useNativeDriver: false
                        })
                    }
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    height: SIZES.height,
                                    width: SIZES.width
                                }}
                            >
                                {item.label == constants.screens.home && <Home />}
                                {item.label == constants.screens.search && <Search />}
                                {item.label == constants.screens.profile && <Profile />}

                            </View>
                        )
                    }}

                />
            </View>
        )
    }

    function renderBottonTab() {
        return (
            <View
                style={{
                    marginBottom: 20,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.radius
                }}
            >
                <Shadow size={[SIZES.width - (SIZES.padding * 2), 85]
                }
                >


                    <View
                        style={{
                            flex: 1,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.primary3
                        }}
                    >
                        <Tabs
                            scrollX={scrollX}
                        />
                    </View>
                </Shadow>
            </View>
        )
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >

            {/* Content */}

            {renderContent()}
            {/* Bottom Tab */}
            {renderBottonTab()}
        </View>
    )


}

export default MainLayout;