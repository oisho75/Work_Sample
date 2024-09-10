import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { AlphaCard, Modal, FormLayout, HorizontalStack } from '@shopify/polaris'
import { apiClient } from '..'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { TextArea } from '../../../Shared/Inputs'
import useForm from '../../../Shared/hooks/useForm'
import Toast from '../../../Shared/reusable/Toast'
import RulesList from './RulesList'

/**
 * Add On and Option Rules
 */
export default function Rules({ option, type }) {
  const [rules, setRules] = useState([])
  const [ruleTypes, setRuleTypes] = useState([])
  const [allVariants, setAllVariants] = useState([])

  const [toastContent, setToastContent] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const [currentRule, setCurrentRule] = useState({})
  const { formValues, handleValuesChange, formErrors } = useForm(currentRule)

  // Get all information on load
  useEffect(() => {
    if (option) {
      fetchAllVariants()
      fetchRules()
    }
  }, [option])

  // Extract all variants from all options
  const extractAllVariants = (options) => {
    let variants = []
    options.map((opt) => {
      variants = [...variants, ...opt.variants]
    })
    return variants
  }

  // Collect all other addon/option variants
  const fetchAllVariants = async () => {
    try {
      const response =
        type == 'addon'
          ? await apiClient.getCatalogAddOns()
          : await apiClient.getCatalogOptions()
      setAllVariants(extractAllVariants(response.data.data))
    } catch (error) {
      console.error(error)
    }
  }

  const fetchRules = () => {
    apiClient
      .getCatalogRules(option.id)
      .then((response) => setRules(response.data))
      .catch((error) => console.error(error))
      .finally(() => fetchRuleTypes())
  }

  const fetchRuleTypes = async () => {
    apiClient
      .getCatalogRuleTypes()
      .then((response) => setRuleTypes(response.data))
      .catch((e) => console.error(e))
  }

  const handleModal = (id) => {
    if (id) {
      const rule = rules.find((rule) => rule.id === id)
      setCurrentRule(rule)
    } else {
      setCurrentRule({})
    }

    setModalOpen(!modalOpen)
  }

  const handleCreate = async (ruleData) => {
    apiClient
      .createCatalogRule(ruleData)
      .then(() => {
        fetchRules()
        setToastContent('Rule created')
      })
      .catch((error) => console.error(error))
  }

  const handleUpdate = async (ruleData) => {
    apiClient
      .updateCatalogRule(currentRule.id, ruleData)
      .then(() => {
        fetchRules()
        setToastContent('Rule updated')
      })
      .catch((error) => console.error(error))
  }

  const handleDelete = async (id) => {
    setModalOpen(false)

    apiClient
      .deleteCatalogRule(id)
      .then(() => {
        fetchRules()
        setToastContent('Rule deleted')
      })
      .catch((error) => console.error(error))
  }

  const handleSubmit = () => {
    const { child_id, rule_type } = formValues
    const ruleData = {
      parent_id: option.id,
      child_id,
      rule_type,
      active: true
    }
    currentRule.id ? handleUpdate(ruleData) : handleCreate(ruleData)
    handleModal()
  }

  // Get all child variants except current parent
  const childItems = allVariants
    .filter((variant) => variant.id !== option.id)
    .map((variant) => ({
      label: variant.title,
      value: variant.id
    }))

  const ruleTypeItems = ruleTypes.map((type) => ({
    label: type,
    value: type
  }))

  return (
    <AlphaCard padding="4">
      <div className="pb-4 w-full flex items-center justify-between">
        <h2 className="text-xl font-semibold">Rules</h2>
        <button
          type="button"
          onClick={() => handleModal()}
          className="font-semibold text-center px-3 py-2 rounded-md shadow-sm bg-sky-600 text-white hover:bg-sky-500"
        >
          <Icon icon={faPlus} className="mr-1" /> New Rule
        </button>
      </div>
      <RulesList
        rules={rules}
        handleModal={handleModal}
        handleDelete={handleDelete}
      />
      <Modal
        open={modalOpen}
        title={currentRule.id ? 'Edit Rule' : 'New Rule'}
        titleHidden
        onClose={() => handleModal()}
      >
        <div className="px-6 py-4 h-full w-full">
          <h2 className="text-2xl font-semibold text-gray-900">
            {`${currentRule.id ? 'Edit' : 'New'} Rule for ${option.title}`}
          </h2>
          <div className="py-6">
            <FormLayout>
              <div className="flex flex-col gap-2 text-gray-700">
                <span className="font-medium">Type</span>
                <Select
                  placeholder="Select Rule"
                  options={ruleTypeItems}
                  value={ruleTypeItems.find(
                    (item) => item.value == formValues.rule_type
                  )}
                  onChange={(selected) =>
                    handleValuesChange('rule_type', selected.value)
                  }
                />
              </div>
              <TextArea
                name="rule_description"
                label="Description"
                value={formValues.rule_description ?? ''}
                handleValuesChange={handleValuesChange}
                errors={formErrors}
              />
              <div className="flex flex-col gap-2 text-gray-700">
                <span className="font-medium">Child</span>
                <Select
                  placeholder={'Select Child'}
                  options={childItems}
                  value={childItems.find(
                    (item) => item.value == formValues.child_id
                  )}
                  menuPlacement={'top'}
                  onChange={(selected) =>
                    handleValuesChange('child_id', selected.value)
                  }
                />
              </div>
            </FormLayout>
          </div>
          <HorizontalStack align="end" blockAlign="center" gap="4" wrap={false}>
            <button
              onClick={() => handleModal()}
              className="mt-4 items-center rounded-md bg-white px-3 py-2 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmit()}
              className="mt-4 items-center rounded-md bg-sky-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-sky-500"
            >
              Save Changes
            </button>
          </HorizontalStack>
        </div>
      </Modal>
      <Toast content={toastContent} />
    </AlphaCard>
  )
}