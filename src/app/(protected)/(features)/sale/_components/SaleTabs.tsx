import { Tabs } from 'antd'
import { useState } from 'react'

import { SaleFormContent } from './SaleFormContent'
import { SaleFormProvider } from './SaleFormProvider'

const { TabPane } = Tabs

export const SaleTabs = () => {
  const [tabs, setTabs] = useState<string[]>(['1'])
  const [activeKey, setActiveKey] = useState('1')

  const addTab = () => {
    const newKey = (Math.max(...tabs.map((k) => parseInt(k))) + 1).toString()
    setTabs([...tabs, newKey])
    setActiveKey(newKey)
  }

  const removeTab = (targetKey: string) => {
    let newActiveKey = activeKey
    const lastIndex = tabs.findIndex((key) => key === targetKey) - 1
    const newTabs = tabs.filter((key) => key !== targetKey)
    if (newTabs.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newTabs[lastIndex]
      } else {
        newActiveKey = newTabs[0]
      }
    }
    setTabs(newTabs)
    setActiveKey(newActiveKey)
  }

  const onEdit = (targetKey: any, action: 'add' | 'remove') => {
    if (action === 'add') {
      addTab()
    } else if (action === 'remove') {
      removeTab(targetKey)
    }
  }

  const onChange = (key: string) => {
    setActiveKey(key)
  }

  return (
    <div style={{ padding: 0, borderRadius: 8 }}>
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        hideAdd={false}
        className="w-full"
      >
        {tabs.map((key) => (
          <TabPane tab={`Hóa đơn ${key}`} key={key} closable={tabs.length > 1}>
            <div style={{ backgroundColor: 'white', borderRadius: 4 }}>
              <SaleFormProvider>
                <SaleFormContent />
              </SaleFormProvider>
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}
