import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  faWindowClose,
  faStopCircle,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  isOpen: boolean
  onClose: any
  children: React.ReactNode
  title: string
}
export function Modal({ isOpen, onClose, children, title }: Props) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative inline-block w-full max-w-md p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-slate-900 text-slate-200 shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 mb-6 tracking-wider"
                >
                  {title}
                </Dialog.Title>
                <button
                  className="p-2 absolute top-2 right-2"
                  onClick={onClose}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-white rotate-45"
                    size="lg"
                  />
                </button>
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
