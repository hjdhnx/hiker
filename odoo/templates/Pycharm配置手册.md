### pycharm 2021.1.3 已装中文插件
###### 设置py文件默认前缀

文件->设置->编辑器->文件和代码模板  
选择文件下的Python script,在里面写入以下代码:
```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : ${NAME}.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : ${DATE}
```
然后下面的两个勾都勾上，按照代码重新格式化与启用实时模板  
#####  新建文件增加odoo视图
也是在刚才的位置，文件里创建一个,名称为odoo视图，扩展为xml  
代码里如下:
```xml
<odoo>
    <data>
        
        
        
    </data>
</odoo>
```

#### odoo实时模板  
文件->设置->编辑器->实时模板  
点击右边+号，选择模板组，输入odoo,然后确定  
接着在odoo模板组里，建立一个个的模板。参考如下:  
缩写: otree  
名称: odoo列表  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record model="ir.ui.view" id="$model_name$_tree">
              <field name="name">$model_name$_tree</field>
              <field name="model">$model$</field>
                <field name="priority">10</field>
              <field name="arch" type="xml">
                <tree limit='1000'>
                    <field name="name" string="名称"/>
                    <field name="type_id" string="类型" widget="many2one"/>
                    <field name="author" string="作者"/>
                    <field name="home_url" string="主页链接"/>
                    <field name="active" string="启用" widget="toggle_button"/>
                </tree>
              </field>
</record>
```
并且进配置将俩变量都设置为表达式
```
fileNameWithoutExtension()
```

缩写: oform  
名称: odoo表单  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record model="ir.ui.view" id="$model_name$_form">
              <field name="name">$model_name$_form</field>
              <field name="model">$model$</field>
                <field name="priority">10</field>
              <field name="arch" type="xml">
                <form create="1" edit="1" delete="1">
                  <sheet>
                      <field name="pic_url_img" class="oe_avatar"/>
                        <div class="oe_title">
                            <label for="name" class="oe_edit_only" string="名称"/>
                            <h1><field name="name" required="1" placeholder="名称"/></h1>
                        </div>
                      <group col="3" >
                          <group colspan="1">
                              <field name="type_id" string="规则分类"/>
                          </group>
                          <group colspan="1">
                              <field name="dev_id" string="开发者"/>
                              <field name="auth" attrs="{'invisible':[('state','!=','private')]}"/>
                          </group>
                      </group>
                      <group>
                          <group>
                                <field name="home_url" string="主页链接"/>
                                <field name="pic_url" string="图片链接"/>
                          </group>

                          <group>
                              <field name="is_json_list" string="是否合集" attrs="{'invisible':[('is_json','=',False)]}"/>
                              <field name="author" string="作者"/>
                          </group>
                      </group>
                  </sheet>
                </form>
              </field>
        </record>
```

缩写: oheader  
名称: odoo表头,放在form下面sheet上面  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<header>
    <button name="share" string="分享此规则" type="object" class="oe_highlight"/>
    <field name="state" widget="statusbar"/>
</header>
```

缩写: ofooter  
名称: odoo页脚,放在</sheet>下面,</form>上面 
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<footer>
    <button string='拒绝' name="expense_payment_refuse_reason" type="object" class="oe_highlight"/>
    <button string="取消" class="oe_link" special="cancel"/>
</footer>
```


缩写: omail  
名称: odoo信息,放在</sheet>外面</form>上面  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<div class="oe_chatter">
    <field name="message_follower_ids" widget="mail_followers"/>
    <field name="activity_ids" widget="mail_activity"/>
    <field name="message_ids" widget="mail_thread"/>
</div>
```

缩写: onotebook 
名称: odoo页签,放在sheet内部 
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<notebook>
<page string="系统信息" groups="base.group_no_one">
  <group>
      <group>
            <field name="create_date" readonly="1" string="创建人"/>
            <field name="create_uid" readonly="1" string="创建日期"/>
      </group>

      <group>
            <field name="write_date" readonly="1" string="修改人"/>
            <field name="write_uid" readonly="1" string="修改日期"/>
      </group>

  </group>
</page>
</notebook>
```

缩写: obtnbox  
名称: odoo按钮盒,放在<sheet>内部开头  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<div class="oe_button_box" name="button_box">
        <button name="toggle_active" type="object" class="oe_stat_button" icon="fa-archive">
            <field name="active" widget="boolean_button"/>
        </button>
</div>
```


缩写: okanban  
名称: odoo看板   
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record id="$model_name$_kanban" model="ir.ui.view">
        <field name="name">$model_name$_kanban</field>
        <field name="model">$model$</field>
        <field name="priority">10</field>
        <field name="arch" type="xml">
            <kanban class="o_kanban_mobile">
                <templates>
                    <t t-name="kanban-box">
                        <div t-attf-class="oe_kanban_content oe_kanban_global_click">

                         <div class="row mb4">
                            <div class="col-6">
                                <strong><span><field name="name"/></span></strong>
                            </div>
                        </div>

                            <div class="col-12 text-right">
                                        <field name="active" widget="toggle_button"/>
                            </div>
                            <div class="oe_module_action" t-if="!selection_mode">
                                <button class="btn-primary" name="apply_this_app" string="仅用此机器人" type="object">仅用此机器人</button>
                            </div>
                        </div>
                    </t>
                </templates>
            </kanban>
        </field>
</record>
```

缩写: opivot  
名称: odoo透视图   
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record id="$model_name$_pivot" model="ir.ui.view">
        <field name="name">$model_name$_pivot</field>
        <field name="model">$model$</field>
        <field name="priority">10</field>
        <field name="arch" type="xml">
            <pivot string="$model_name$_pivot" >
                    <field name="internal_group" type="row"/>
                    <field name="account_id" type="row"/>
                    <field name="fr_period_id" type="col" string="会计期间"/>
                    <field name="debit_start" type="measure"/>
                    <field name="credit_start" type="measure"/>
                    <field name="beginning_start" type="measure"/>
            </pivot>
        </field>
</record>
```

缩写: osearch  
名称: odoo搜索   
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record model="ir.ui.view" id="$model_name$_search">
                <field name="name">$model_name$_search</field>
                <field name="model">$model$</field>
                <field name="arch" type="xml">
                  <search string="搜索">
                      <!--自定义可搜索字段，比如价格-->
                    <field name="name" string="名称"/>
                    <separator/>
                    <filter string="全部" name="all" domain="['|',('active','=',True),('active','=',False)]"/>
                    <filter string="已启用" name="active" domain="[('active','=',True)]"/>
                    <filter string="已归档" name="drop" domain="[('active','=',False)]"/>
                    <separator/>
                    <group expand="0" string="分组">
                        <filter string="状态" name="state" context="{'group_by':'state'}"/>
                    </group>
                  </search>

               </field>
</record>
```

缩写: otreeInherit  
名称: odoo列表继承  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record model = "ir.ui.view" id = "$model_name$_tree_extent">
            <field name="name">$model_name$_tree_extent</field>
            <field name="model">$model$</field>
            <field name="inherit_id" ref="$module$.$tree_view$"/>
            <field name="arch" type="xml">
            <data>
                <xpath expr = "//field[@name='name']" position = "after">
                    <field name="note" string="备注"/>
                </xpath>
                
                <xpath expr = "//field[@name='name']" position = "before">
                    <field name="note" string="备注"/>
                </xpath>
                
                <xpath expr = "//field[@name='name']" position = "attributes">
                    <attribute name="invisible">1</attribute>
                    <attribute name="string">名称</attribute>
                </xpath>
                
            </data>
            </field>
</record>
```

缩写: oformInherit  
名称: odoo表单继承  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record model = "ir.ui.view" id = "$model_name$_form_extent">
            <field name="name">$model_name$_form_extent</field>
            <field name="model">$model$</field>
            <field name="inherit_id" ref="$module$.$form_view$"/>
            <field name="arch" type="xml">
            <data>
                <xpath expr = "//field[@name='name']" position = "after">
                    <field name="note" string="备注"/>
                </xpath>
                
                <xpath expr = "//field[@name='name']" position = "before">
                    <field name="note" string="备注"/>
                </xpath>
                
                <xpath expr = "//field[@name='name']" position = "attributes">
                    <attribute name="invisible">1</attribute>
                    <attribute name="string">名称</attribute>
                </xpath>
                
            </data>
            </field>
</record>
```

缩写: osearchInherit  
名称: odoo搜索继承  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record model = "ir.ui.view" id = "$model_name$_search_ext">
            <field name="name">$model_name$_search_ext</field>
            <field name="model">$model$</field>
            <field name="inherit_id" ref="$module$.$search_view$"/>
           <field name="priority" eval="10"/>
            <field name="arch" type="xml">

                <xpath expr = "//group/filter[@name='state']" position = "after">
                    <filter string="组" name="group_id" context="{'group_by':'group_id'}" domain="[]"/>
                </xpath>
            </field>
</record>
```

缩写: oactionWin  
名称: odoo窗口动作  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
 <record id="action_open_$model_name$" model="ir.actions.act_window">
            <field name="name">$model_name$列表</field>
            <field name="res_model">$model$</field>
            <field name="view_mode">tree,form</field>
            <field name="view_id" ref="$module$.$tree_view$"/>
<!--            <field name="target">new,current,main,fullscreen</field>-->
            <field name="context">{'search_default_all':True,'form_view_ref': '$module$.form_view', 'tree_view_ref': '$module$.tree_view'}</field>
            <field name="domain">[('create_uid','=',uid)]</field>
</record>
```

缩写: oactionUrl  
名称: odoo打开链接动作  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record model="ir.actions.act_url" id="actUrl_open_baidu">
      <field name="name">打开百度</field>
      <field name="target">new,self</field>
      <field name="url">https://www.baidu.com</field>
</record>
```

缩写: oactionSev
名称: odoo服务器动作  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record id="action_$action_name$" model="ir.actions.server">
                    <field name="name">$action_name$</field>
                    <field name="model_id" ref="model_$model_name$"/>
                    <field name="binding_model_id" ref="model_$model_name$"/>  <!--将该动作添加到该模型视图的选项中-->
                    <field name="state">code</field>
                    <field name="code">
                    action = records.action_$action_name$()
                    </field>
</record>
```

缩写: omenu  
名称: odoo顶级子菜单  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<menuitem name="子菜单名称" id="menu_$menu_id$" parent="$module$.$parent_menu_id$"
                  action="$module$.$act_win$" sequence="1"/>
```

缩写: omenu_root  
名称: odoo顶级菜单  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<menuitem name="根菜单名称" groups="base.group_system" 
          id="nemu_$model_name$_root"
          web_icon="$module$,static/description/icon.png"  
          action="$module$.$act_win$" sequence="1"/>
      
```

缩写: opaction  
名称: odoo动作  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
val =  {
            'name': "$action_name$",
            'view_mode': 'tree,form',
            'res_model': '$module$.$menu_name$',
            'domain': [('id', '=', self.receivable_id.id)],
            'type': 'ir.actions.act_window',
            'context': {'form_view_ref': '$module$.form_view','tree_view_ref': '$module$.tree_view',
                        },
            'target': 'self',
    }
     
```

缩写: opmail  
名称: odoo继承消息  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
_inherit = ['mail.thread', 'mail.activity.mixin']
     
```

缩写: opmodel  
名称: odoo模型  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
class $model_name$(models.Model):
    _name = '$model$'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _description = '描述'
    _rec_name = "name"
    _order = 'code, name asc'
```

缩写: opmodel_wizard  
名称: odoo瞬态模型  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
class $model_name$_wizard(models.Model):
    _name = '$model$.wizard'
    _description = '向导'
```


缩写: opimport    
名称: odoo引入包  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
from odoo import models, fields, api
from odoo.exceptions import UserError, ValidationError
```

缩写: opactive  
名称: odoo启用字段  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
active = fields.Boolean(string='是否启用',default=True)
```

缩写: opinstall  
名称: odoo模块安装信息  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
'installable': True,
'application': True,
'sequence': '1',
'auto_install': False
```

缩写: opoption  
名称: odoo选项字段  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
department_type_option = [(1,"临床"),(2,"医技"),(3,"医辅"),(4,"行政后勤")]
department_type = fields.Selection(department_type_option,string="科室类别")
```



