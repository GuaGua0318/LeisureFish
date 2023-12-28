import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
//引入组件
import Home from '../views/Home'
//需要懒加载的组件

export default function Router() {
    return (
        <Suspense fallback={<>loading...</>}>
            <Routes>
                <Route path='/home' element={<Home/>}/>
                {/* 使用 Navigate 将默认路径匹配到/home */}
                <Route path='/' element={<Navigate to='/home'/>}/>
            </Routes>
        </Suspense>
    )
}
