import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
//引入组件
import Home from '@renderer/views/Home'
import ColorPicker from '@renderer/views/Home/components/ColorPicker'
//需要懒加载的组件

export default function Router() {
  return (
    <Suspense fallback={<>loading...</>}>
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* 使用 Navigate 将默认路径匹配到/home */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/colorPicker" element={<ColorPicker />} />
      </Routes>
    </Suspense>
  )
}
