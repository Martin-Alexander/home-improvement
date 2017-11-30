class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.text :description
      t.boolean :private
      t.integer :estimated_level_of_effort
      t.integer :actual_level_of_effort
      t.string :status

      t.timestamps
    end
  end
end
