import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { EmployeeList } from '../../components/EmployeeList'
import { DefaultPage } from '../../../shared/components/UIElements/DefaultPage'
import { Backdrop } from '../../../shared/components/UIElements/Backdrop'

import styles from './styles.module.scss'
import { AddEmployee } from '../AddEmployee'
import axios, { AxiosResponse } from 'axios'
import { EmptyPage } from '../../../shared/components/UIElements/EmptyPage'
import { BtnBottomSide } from '../../../shared/components/BtnBottomSide'
import { DefaultInsidePage } from '../../../shared/components/UIElements/DefaultInsidePage'

const portalElement = document.getElementById(
  'overlays',
) as HTMLElement


const urlPath = 'http://localhost:5000/api/employee/'

type employee = {
  id: string
  name: string
  email: string
  status: string
}



export const Employee = () => {
  const [listEmpty, setListEmpty] = useState(true)

  const [addEmployeeIsShown, setEmployeeIsShown] =
    useState(false)

  const [listEmployee, setListEmployee] = useState<
    employee[]
  >([])

  useEffect(() => {

    try {
      // setInterval(() => {
      axios.get(urlPath).then((response: AxiosResponse) => {
        setListEmployee(response.data)
      })

    } catch (error) {
      console.log('Error: ' + error)
    }

    if (listEmployee.length === 0) {
      setListEmpty(true)
    } else {
      setListEmpty(false)
    }
  }, [listEmployee])

  

  const showAddEmployeeHandler = () => {
    setEmployeeIsShown(true)
  }

  const closeAddEmployeeHandler = () => {
    setEmployeeIsShown(false)
  }

  return (
    <>
      {addEmployeeIsShown &&
        ReactDOM.createPortal(
          <>
            <Backdrop onClose={closeAddEmployeeHandler} />,
            <AddEmployee
              onClose={closeAddEmployeeHandler}
            />
          </>,
          portalElement,
        )}
      <DefaultPage>

        {listEmpty && (
          <EmptyPage message="Sem Funcionários" />
        )}

        {!listEmpty && (
          <DefaultInsidePage
            className={styles.tableContainer}>
            <div className={styles.header}>
              <div className={styles.title}>
                <p>Nome</p>
              </div>
              <div className={styles.title}>
                <p>Email</p>
              </div>
              {/* <div className={styles.title}>
                <p>Status</p>
              </div> */}
            </div>
            <EmployeeList employees={listEmployee} />
          </DefaultInsidePage>
        )}
        <BtnBottomSide
          btnText="Adicionar Funcionário"
          showHandler={showAddEmployeeHandler}
        />
      </DefaultPage>
    </>
  )
}
