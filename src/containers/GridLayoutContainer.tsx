import { Grid, GridItem } from "@chakra-ui/react"
import React from "react"

export const GridLayoutContainer = (props: any) => {

    const { left, right } = props

    return <Grid
        h="100%"
        w="100%"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
    >
        <GridItem colSpan={2} p="10" m="10" >{left}</GridItem>
        <GridItem colSpan={1} p="10" m="10" >{right}</GridItem>
    </Grid>
}