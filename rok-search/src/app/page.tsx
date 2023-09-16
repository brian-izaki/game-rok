'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import data from './data.json'
import { debounce } from 'lodash'

export default function Home() {
  const [search, setSearch] = useState('')
  const [dataResultList, setDataResultList] = useState(data)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    console.log(e)
  }

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const debounced = debounce(() => {
      const result = data.filter(d => {
        const question = d.question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return question.match(e.target.value.toLocaleLowerCase()) != null
      })
      setDataResultList(result)

    }, 500)

    debounced()
  }

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">
          Pesquisa
          <input id='search' type="text" onChange={(e) => handleChangeSearch(e)} />
        </label>
      </form>

      <section className={styles['question-container']}>
        {dataResultList.map((data, index) => (
          <div className={styles['question-card']} key={index}>
            <p className={styles.question}> {data.question} </p>
            <p className={styles.answer}> {data.answer} </p>
          </div>
        ))}
      </section>
    </main>
  )
}
