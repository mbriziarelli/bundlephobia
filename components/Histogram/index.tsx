import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const colorPaid = '#7fdbff'
const colorSent = '#39cccc'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: '"fira-sans-2", Verdana, sans-serif',
    },
    graph: {
      display: 'block',
      position: 'relative',
      width: '600px',
      height: '300px',
      margin: '1.1em 0 0',
      padding: '0',
      background: 'transparent',
      fontSize: '11px',
      '& tr': {
        extend: 'cell',
      },
      '& th': {
        extend: 'cell',
      },
      '& td': {
        extend: 'cell',
        transition: 'all .3s ease',
        '&:hover': {
          backgroundColor: 'desaturate(#85144b, 100)',
          opacity: 0.9,
          color: 'white',
        },
      },
    },
    graphHead: {
      '& tr': {
        left: '100%',
        top: '50%',
        bottom: 'auto',
        margin: '-2.5em 0 0 5em',
      },
      '& th': {
        width: '7.5em',
        height: 'auto',
        padding: '0.5em 1em',
      },
    },
    headSent: {
      extend: 'sent',
      top: 0,
      left: 0,
      lineHeight: 2,
    },
    heasPaid: {
      extend: 'paid',
      top: '2.75em',
      lineHeight: 2,
      left: 0,
    },
    graphBody: {
      '& tr': {
        height: '296px',
        paddingTop: '2px',
        borderRight: '1px dotted #C4C4C4',
        color: '#AAA',
      },
      '& th': {
        bottom: '-1.75em',
        verticalAlign: 'top',
        fontWeight: 'normal',
        color: '#333',
      },
    },
    cell: {
      position: 'absolute',
      bottom: 0,
      width: '150px',
      zIndex: 2,
      margin: 0,
      padding: 0,
      textAlign: 'center',
    },
    caption: {
      captionSide: 'top',
      width: '600px',
      textTransform: 'uppercase',
      letterSpacing: '.5px',
      top: '-40px',
      position: 'relative',
      zIndex: 10,
      fontWeight: 'bold',
    },

    q1: { left: 0 },
    q2: { left: '150px' },
    q3: { left: '300px' },
    q4: { left: '450px', borderRight: 'none' },
    bar: {
      width: '60px',
      border: '1px solid',
      borderBottom: 'none',
      color: '#000',
      '& p': {
        margin: '5px 0 0',
        padding: 0,
        opacity: 0.4,
      },
    },
    sent: {
      left: '13px',
      backgroundColor: colorSent,
      borderColor: 'transparent',
    },
    paid: {
      left: '77px',
      backgroundColor: colorPaid,
      borderColor: 'transparent',
    },
    barSent: {
      extend: ['bar', 'sent'],
    },
    barPaid: {
      extend: ['bar', 'paid'],
    },
  })
)

const Histogram: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <table className={classes.graph}>
        <caption className={classes.caption}>Quarterly Results</caption>
        <thead className={classes.graphHead}>
          <tr>
            <th></th>
            <th className={classes.headSent}>Invoiced</th>
            <th className={classes.heasPaid}>Collected</th>
          </tr>
        </thead>
        <tbody className={classes.graphBody}>
          <tr className={classes.q1}>
            <th scope="row">Q1</th>
            <td className={classes.sent} style={{ height: '111px' }}>
              <p>$18,450.00</p>
            </td>
            <td className={classes.bar} style={{ height: '99px' }}>
              <p>$16,500.00</p>
            </td>
          </tr>
          <tr className={classes.q2}>
            <th scope="row">Q2</th>
            <td className={classes.sent} style={{ height: '206px' }}>
              <p>$34,340.72</p>
            </td>
            <td className={classes.bar} style={{ height: '194px' }}>
              <p>$32,340.72</p>
            </td>
          </tr>
          <tr className={classes.q3}>
            <th scope="row">Q3</th>
            <td className={classes.sent} style={{ height: '259px' }}>
              <p>$43,145.52</p>
            </td>
            <td className={classes.bar} style={{ height: '193px' }}>
              <p>$32,225.52</p>
            </td>
          </tr>
          <tr className={classes.q4}>
            <th scope="row">Q4</th>
            <td className={classes.sent} style={{ height: '110px' }}>
              <p>$18,415.96</p>
            </td>
            <td className={classes.bar} style={{ height: '195px' }}>
              <p>$32,425.00</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Histogram
