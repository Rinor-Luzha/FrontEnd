import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Footer from '../components/Footer' 
import MainSlider from '../components/sliders/main/MainSlider'
import Actors from '../components/ActorList'
import ListItem from '../components/ListItem'

export default function Home() {
  return (
    <div>
      <ListItem />
    <MainSlider />
    <Footer />
    </div>
  )
}
